<template>
  <v-card>
    <v-app-bar dense fixed>
      <v-app-bar-nav-icon class="d-flex d-sm-none">
        <template v-slot:default>
          <v-icon size="28" @click="drawer = true">{{ drawerIcon }}</v-icon>
        </template>
      </v-app-bar-nav-icon>
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
              <html-entities
                :label="responsiveHTMLEntitiesTitle"
                :extended="extended"
                @onClickTableExtended="$emit('onChangeTableExtended', extended)"
              ></html-entities>
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
                :label="`Columns: ${tableFormat.toString()}`"
              ></v-slider>
            </v-col>
            <v-col align-self="center">
              <v-row>
                <v-col class="d-none d-lg-flex d-xl-flex">
                  <v-switch
                    dense
                    hide-details
                    label="Small table"
                    @change="setSmallTable"
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
              @onClickDecreaseFontSize="decreaseFontSize"
              @onClickIncreaseFontSize="increaseFontSize"
            ></change-font>
            <v-col align-self="center">
              <change-theme :hide-details="true"></change-theme>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <navigation-drawer
      v-model="drawer"
      @onClickDecreaseFontSize="decreaseFontSize"
      @onClickIncreaseFontSize="increaseFontSize"
      @onClickTableExtended="$emit('onChangeTableExtended')"
    ></navigation-drawer>
  </v-card>
</template>

<script>
import { mdiMenu } from "@mdi/js"
import Search from "@/components/Search";
import ChangeFont from "@/components/ChangeFont";
import ChangeTheme from "@/components/ChangeTheme";
import NavigationDrawer from "@/components/NavigationDrawer";
import HtmlEntities from "@/components/HtmlEntities";
import { mapState, mapWritableState } from "pinia";
import { useAsciiTableStore } from "@/stores/AsciiTableStore";

export default {
  name: "AppHeader",
  components: {
    Search,
    ChangeFont,
    ChangeTheme,
    NavigationDrawer,
    HtmlEntities
  },
  props: {
    title: String,
  },
  data() {
    return {
      extended: false,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      drawer: false,
      drawerIcon: mdiMenu,
      tableFormat: 4
    }
  },
  computed: {
    responsiveTitle() {
      if (this.width > 985) {
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
    ...mapState(useAsciiTableStore, ['tableColumns']),
    ...mapWritableState(useAsciiTableStore, ['setTableColumns', 'setSearch', 'increaseFontSize', 'decreaseFontSize', 'setSmallTable'])
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
        this.setTableColumns(1)
        this.tableFormat = 1
      } else if (this.width < 1000) {
        this.$emit('onChangeTableFormat', 2)
        this.setTableColumns(2)
        this.tableFormat = 2
      } else if (this.width < 1350) {
        this.$emit('onChangeTableFormat', 3)
        this.setTableColumns(3)
        this.tableFormat = 3
      } else {
        this.$emit('onChangeTableFormat', 4)
        this.setTableColumns(4)
        this.tableFormat = 4
      }
    },
    getDimensions() {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
    },
    onChangeSearch(e) {
      this.setSearch(e)
    }
  }
};
</script>

<style scoped>
  h1 {
    font-weight: normal;
    font-size: 20px;
  }
</style>