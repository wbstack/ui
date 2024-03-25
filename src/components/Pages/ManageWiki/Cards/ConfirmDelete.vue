<template xmlns="http://www.w3.org/1999/html">
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body dark-grey--text">
        <slot name="body">
          <v-card-title>
            Confirm Deletion
          </v-card-title>
          <v-card-text>
            <p>Before you delete your wikibase instance, <br/> please let us know the reason for your deletion.<br/>
            Please select all that apply.<p/>
            <v-checkbox class="ma-0" type="checkbox" label="Was only used for testing" />
            <v-checkbox class="ma-0" type="checkbox" label="Lacking essential functionality" />
            <v-checkbox class="ma-0" type="checkbox" label="Too complex to work with" />
            <v-checkbox class="ma-0" type="checkbox" label="Other reasons (please specify)" />
            <!--input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
                <label for="mike" class="grey--text"> </label><br/-->
            <p>Please elaborate:</p>
            <v-text-field class="ma-0 pa-0" type="text" placeholder="e.g. ran out of space to create new wiki"/>
          </v-card-text>
        </slot>
      </section>
      <div class="modal-footer text-right">
        <v-btn text @click='close'>Cancel</v-btn>
        <v-btn  text @click="doDelete" variant="light" class="red--text">Delete Wikibase</v-btn>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ConfirmDelete',
  props: [
    'wikiId'
  ],
  methods: {
    doDelete () {
      const wiki = this.wikiId

      this.$store
        .dispatch('deleteWiki', { wiki })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0px;
  bottom: 30%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: inherit;
}

.modal {
  background: #FFFFFF;
  box-shadow: 0px 0px 25px 0px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius:4px;
}
.modal-body {
  position: relative;
  padding: 10px 10px;
}
.modal-footer {
  margin-bottom: 10px;
}
</style>
