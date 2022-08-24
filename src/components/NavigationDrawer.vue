<template>
  <v-navigation-drawer
    v-bind:value="value"
    fixed
    v-on:input="$emit('input', $event)"
    temporary
  >
    <v-container>
      <v-row no-gutters>
        <v-col align-self="center">
          <html-entities :extended="extended" @onClickTableExtended="$emit('onClickTableExtended')"></html-entities>
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
</template>

<script>
import ChangeFont from "@/components/ChangeFont";
import ChangeTheme from "@/components/ChangeTheme";
import HtmlEntities from "@/components/HtmlEntities";

export default {
  name: "NavigationDrawer",
  components: {
    ChangeFont,
    ChangeTheme,
    HtmlEntities
  },
  props: {
    value: Boolean,
    extended: Boolean
  }
};
</script>