<template>
  <v-app-bar dense fixed>
    <v-row dense class="d-none d-md-flex">
      <v-col cols="auto" align-self="center" style="background: cyan">
        <v-toolbar-title>{{ responsiveTitle }}</v-toolbar-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-col style="background: green" align-self="center" md="3" lg="3">
        <v-row>
          <v-col align-self="center">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              dense
              hide-details
              single-line
              placeholder="Search Character"
              @keyup="$emit('onChangeSearch', search)"
            ></v-text-field>
          </v-col>
          <v-col align-self="center">
            <v-switch
              dense
              hide-details
              @change="$emit('onChangeTableExtended')"
              label="HTML Entities"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col align-self="center" style="background: yellow" md="5" lg="5">
        <v-row>
          <v-col align-self="center">
            <v-slider
              dense
              hide-details
              v-model="tableFormat"
              :thumb-size="24"
              min="1"
              max="6"
              @change="$emit('onChangeTableFormat', tableFormat)"
              :label="tableFormat.toString()"
            ></v-slider>
          </v-col>
          <v-col align-self="center">
            <v-row>
              <v-col align-self="center">
                <v-switch
                  dense
                  hide-details
                  label="Dense table"
                  :value="tableDense"
                  @change="$emit('onChangeTableDense')"
                ></v-switch>
              </v-col>
              <v-col class="d-md-none d-lg-flex">
                <v-switch
                  dense
                  hide-details
                  label="Small table"
                  @change="$emit('onChangeSmallTable')"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" align-self="center" style="background: orange">
        <v-row>
          <v-col align-self="center">
            <v-btn small @click="$emit('onClickDecreaseFontSize')">
              A-
            </v-btn>
            <v-btn small @click="$emit('onClickIncreaseFontSize')">
              A+
            </v-btn>
          </v-col>
          <v-col align-self="center" class="no-grow">
            <v-switch
              dense
              hide-details
              v-model="$vuetify.theme.dark"
              label="Dark"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    tableDense: Boolean,
    title: String,
  },
  data() {
    return {
      tableFormat: 4,
      search: "",
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    responsiveTitle() {
      if (this.width > 975) {
        return this.title
      } else {
        return this.title.split(" ")[0]
      }
    }
  },
  watch: {
    width() {
      if (this.width < 550) {
        this.$emit('onChangeTableFormat', 1)
        this.tableFormat = 1
      } else if (this.width < 1000) {
        this.$emit('onChangeTableFormat', 2)
        this.tableFormat = 2
      } else if (this.width < 1350) {
        this.$emit('onChangeTableFormat', 3)
        this.tableFormat = 3
      } else {
        this.$emit('onChangeTableFormat', 4)
        this.tableFormat = 4
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions)
  },
  destroyed() {
    window.removeEventListener('resize', this.getDimensions)
  },
  methods: {
    getDimensions() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
    }
  }
};
</script>

<style scoped>
  h1 {
    font-weight: normal;
    font-size: 20px;
  }
  .no-grow {
    flex-grow: 0;
  }
  .no-max-width {
    width: auto;
  }
  .no-wrap {
    white-space: nowrap;
  }
</style>