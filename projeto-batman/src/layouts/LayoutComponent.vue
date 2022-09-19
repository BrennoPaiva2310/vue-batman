<template>
  <q-layout view="lHh Lpr lFf" class="text- adicionarImagem">
    <q-header elevated class="bg-yellow-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title class="justify-center flex">
          <img
            style="width: 70px"
            src="https://i.pinimg.com/originals/41/69/e2/4169e2756d684276d705baf6ae8e6ab9.png"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-teal-9">
      <q-list dark>
        <q-item-label header>Operações</q-item-label>
        <router-link to="/consultar">
          <q-item clickable target="_blank" rel="noopener">
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Consultar </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container> </q-page-container>
    <q-page-container>
      <Formulario @valorEmitido="abrir = $event"> </Formulario
    ></q-page-container>
    <q-page-container v-if="abrir"> <Busca></Busca></q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Formulario from "../components/FormularioComponent.vue";
import Busca from "../components/BuscaComponent.vue";
import busca from "../components/mixins/metodos";

export default {
  mixins: [busca],
  components: { Formulario, Busca },
  name: "MyLayout",
  data() {
    return {
      abrir: false,
      recarregarConsulta: "",
    };
  },

  setup() {
    const leftDrawerOpen = ref(false);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
};
</script>
<style scoped>
.adicionarImagem {
  background-image: url("https://images.alphacoders.com/559/55991.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
