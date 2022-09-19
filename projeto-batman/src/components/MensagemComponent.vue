<template>
  <div class="q-pa-md">
    {{ mostrarNotificacao(abrir, msg) }}
  </div>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  props: ["abrir", "msg"],
  data() {
    const q = useQuasar();

    return {
      mostrarNotificacao(abrir, msg) {
        if (abrir) {
          q.notify({
            message: msg,
            color: "red",
            avatar: "",
            actions: [
              {
                label: "Dispensar",
                color: "white",
                handler: () => {},
              },
            ],
          });
        }
      },
    };
  },
};
</script>

<style></style>
