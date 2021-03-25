<template>
<div>
  <v-data-table
    :headers="headers"
    :items="entities"
    sort-by="wikidata"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ mappingName }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
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
      <v-icon
          small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>

      <v-icon
          small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
  </v-data-table>

    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="space"
                v-bind="attrs"
                v-on="on"
            >
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
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.local"
                    label="My Wikibase (Your Instance)"
                    :rules="[isValidEntityId]"
                    validate-on-blur
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
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
            <v-btn
            color="blue darken-1"
            text
            @click="close"
            >
            Cancel
            </v-btn>
            <v-btn
            color="blue darken-1"
            text
            @click="save"
            >
            Save
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  name: 'EntityTable',
  props: ['mappingName', 'entityValidation', 'entityName', 'storeAction', 'deleteAction'],
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
        const mapping = this.$store.state.wikis.currentWikiSettings.entityMapping[this.mappingName]

        return Object.keys(mapping)
          .map((wikidataId) => ({ local: mapping[wikidataId], wikidata: wikidataId }))
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
      const currentItem = this.entities[this.editedIndex]
      this.deleteItemInStore(currentItem)
      this.$store.dispatch('saveEntityMapping', this.$route.params.id)

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

      const dbMapping = {}
      dbMapping[this.editedItem.wikidata] = this.editedItem.local

      if (this.editedIndex > -1) {
        const currentItem = this.entities[this.editedIndex]

        this.deleteItemInStore(currentItem)
        this.addItemToStore(dbMapping)
      } else {
        this.addItemToStore(dbMapping)
      }

      this.$store.dispatch('saveEntityMapping', this.$route.params.id)

      this.close()
    },

    deleteItemInStore (currentItem, dbItem) {
      this.$store.dispatch(this.deleteAction, currentItem, dbItem)
    },

    addItemToStore (item) {
      this.$store.dispatch(this.storeAction, item)
    }
  }
}
</script>

<style lang="css" scoped>
.space {
  margin: 20px;
}
</style>
