<template>
  <p>{{ $t("hello") }}</p>
</template>

<script>
export default {
  name: "HelloI18n"
};
</script>

<i18n>
{
  "ru": {
    "message": "Привет",
    "welcome": "Willkommen!",
    "yes-button": "Ja",
    "no-button": "Nein!"
  },
  "uz": {
    "hello": "Hello i18n in SFC!",
    "welcome": "Welcome!",
    "yes-button": "Yes",
    "no-button": "No!"
  }
}
</i18n>
