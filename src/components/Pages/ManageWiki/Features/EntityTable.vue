<template>
<div>
  <v-data-table :headers="headers" :items="entities" sort-by="wikidata" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ mappingName }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this mapping?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn class="space" v-bind="attrs" v-on="on">
            Add New Mapping
        </v-btn>
    </template>

    <v-card>
      <v-card-title>
          <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="mapping">
          <v-container>
          <v-row>
              <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="editedItem.local"
                  label="My Wikibase (Your Instance)"
                  :rules="[isValidEntityId]"
                  validate-on-blur
              ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="editedItem.wikidata"
                  label="Wikidata"
                  :rules="[isValidEntityId]"
                  validate-on-blur
              ></v-text-field>
              </v-col>
          </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'EntityTable',
  props: ['mappingName', 'entityValidation', 'entityName', 'entitiesList'],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'My Wikibase (Your Instance)',
        align: 'start',
        sortable: true,
        value: 'local'
      },
      { text: 'Wikidata', value: 'wikidata' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      local: '',
      wikidata: ''
    },
    defaultItem: {
      local: '',
      wikidata: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Mapping' : 'Edit Mapping'
    },
    entities: {
      get () {
        return Object.keys(this.entitiesList)
          .map((wikidataId) => ({ local: this.entitiesList[wikidataId], wikidata: wikidataId }))
      },
      set (entityMapping) {
        const mapping = {}
        entityMapping.forEach(entityPair => {
          mapping[entityPair.wikidata] = entityPair.local
        })
        this.$emit('setEntityMapping', mapping)
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    isValidEntityId (val) {
      return this.entityValidation.test(val) || `"${val}" is not a valid ${this.entityName} id`
    },
    editItem (item) {
      this.editedIndex = this.entities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.entities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.entities.splice(this.editedIndex, 1)
      // TODO: this way of deleting an item pair is silly. how to do computed setters for arrays?!
      this.entities = [...this.entities]
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (!this.$refs.mapping.validate()) {
        return
      }

      if (this.editedIndex > -1) {
        // TODO: this way of editing an item pair is silly. how to do computed setters for arrays?!
        this.entities[this.editedIndex] = this.editedItem
        this.entities = [...this.entities]
      } else {
        this.entities = [...this.entities, this.editedItem]
      }
      this.close()
    }
  }
}
</script>

<style lang="css" scoped>
.space {
  margin-top: 24px;
}
</style>
