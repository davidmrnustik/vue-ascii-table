<template>
  <v-card>
    <v-app-bar dense fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-row dense>
        <v-col cols="auto" align-self="center">
          <v-toolbar-title>{{ responsiveTitle }}</v-toolbar-title>
        </v-col>
        <v-spacer class="d-none d-lg-flex d-xl-none"></v-spacer>
        <v-col align-self="center" sm="6" cols="8" md="4" lg="3">
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
                :label="responsiveHTMLEntitiesTitle"
              ></v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer class="d-none d-lg-flex d-xl-none"></v-spacer>
        <v-col align-self="center" md="4" lg="4">
          <v-row>
            <v-col align-self="center" md="10" lg="6" class="d-none d-md-flex">
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
                <v-col class="d-none d-lg-flex d-xl-flex">
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
        <v-spacer class="d-none d-lg-flex d-xl-none"></v-spacer>
        <v-col cols="auto" align-self="center">
          <v-row>
            <v-col align-self="center" class="d-none d-sm-flex">
              <v-btn small @click="$emit('onClickDecreaseFontSize')">
                A-
              </v-btn>
              <v-btn small @click="$emit('onClickIncreaseFontSize')">
                A+
              </v-btn>
            </v-col>
            <v-col align-self="center">
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
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: String,
  },
  data() {
    return {
      tableFormat: 4,
      search: "",
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      drawer: false,
      group: null
    }
  },
  computed: {
    responsiveTitle() {
      if (this.width > 975) {
        return this.title
      } else {
        return this.title.split(" ")[0]
      }
    },
    responsiveHTMLEntitiesTitle() {
      if (this.width <= 1000) {
        return "HTML"
      } else {
        return "HTML Entities"
      }
    },
  },
  watch: {
    width() {
      this.setTableFormat()
    }
  },
  mounted() {
    this.setTableFormat()
    window.addEventListener('resize', this.getDimensions)
  },
  destroyed() {
    window.removeEventListener('resize', this.getDimensions)
  },
  methods: {
    setTableFormat() {
      if (this.width < 650) {
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
    },
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