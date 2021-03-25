<template>
<div>
  <v-data-table
    :headers="headers"
    :items="properties"
    sort-by="wikidata"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Properties</v-toolbar-title>
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
                    :rules="[isValidPropertyId]"
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
                    :rules="[isValidPropertyId]"
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
             <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue darken-1" v-bind="attrs" v-on="on" text @click="save">Save</v-btn>
                </template>
                <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
            </v-tooltip>
        </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  name: 'EntityTable',
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
    properties: [],
    editedIndex: -1,
    editedItem: {
      local: '',
      wikidata: ''
    },
    defaultItem: {
      local: '',
      wikidata: ''
    },
    isValidPropertyId: (val) => /^P\d+$/.test(val) || `"${val}" is not a valid Property id`
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Mapping' : 'Edit Mapping'
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

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.properties = [
        {
          local: 'No Mapping',
          wikidata: 'P31'
        },
        {
          local: 'No Mapping',
          wikidata: 'P279'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.properties.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.properties.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.properties.splice(this.editedIndex, 1)
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
        Object.assign(this.properties[this.editedIndex], this.editedItem)
      } else {
        this.properties.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="css" scoped>
.space {
  margin: 20px;
}
</style>
