<template>
  <v-card>
    <v-app-bar dense fixed>
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-row dense>
        <v-col cols="auto" align-self="center" lg="1">
          <v-toolbar-title>{{ responsiveTitle }}</v-toolbar-title>
        </v-col>
        <v-col align-self="center" sm="6" cols="8" md="4" lg="4" xl="4">
          <v-row>
            <v-col align-self="center">
              <search @onChangeSearch="onChangeSearch"></search>
            </v-col>
            <v-col align-self="center" class="d-none d-sm-flex">
              <v-switch
                dense
                hide-details
                @change="$emit('onChangeTableExtended')"
                :label="responsiveHTMLEntitiesTitle"
              ></v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer class="d-none d-lg-flex"></v-spacer>
        <v-col align-self="center" md="4" lg="4" xl="4">
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
        <v-spacer class="d-none d-lg-flex"></v-spacer>
        <v-col cols="auto" align-self="center" class="d-none d-sm-flex">
          <v-row>
            <change-font
              css-rules="d-none d-sm-flex"
              @onClickDecreaseFontSize="$emit('onClickDecreaseFontSize')"
              @onClickIncreaseFontSize="$emit('onClickIncreaseFontSize')"
            ></change-font>
            <v-col align-self="center">
              <change-theme :hide-details="true"></change-theme>
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
      <v-container>
        <v-row no-gutters>
          <v-col align-self="center">
            <v-switch
              dense
              hide-details
              @change="$emit('onChangeTableExtended')"
              label="HTML Entities"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <change-font
            @onClickDecreaseFontSize="$emit('onClickDecreaseFontSize')"
            @onClickIncreaseFontSize="$emit('onClickIncreaseFontSize')"
          ></change-font>
          <v-col align-self="center" class="ml-5">
            <change-theme></change-theme>
          </v-col>
        </v-row>

      </v-container>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import Search from "@/components/Search";
import ChangeFont from "@/components/ChangeFont";
import ChangeTheme from "@/components/ChangeTheme";

export default {
  name: "AppHeader",
  components: {
    Search,
    ChangeFont,
    ChangeTheme
  },
  props: {
    title: String,
  },
  data() {
    return {
      tableFormat: 4,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      drawer: false
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
    },
    onChangeSearch(e) {
      this.$emit("onChangeSearch", e)
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