<template>
  <div class="q-gutter-md col" style="max-width: 100%">
    <q-field outlined label="Nome do Vilão" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ vilao.nome }}
        </div>
      </template>
    </q-field>
    <q-field outlined label="Data da ultima visuzalização" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ formatarData(vilao.dataUltimaVisualizacao) }}
        </div>
      </template>
    </q-field>

    <q-field outlined label="Status" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ vilao.status.status }}
        </div>
      </template>
    </q-field>

    <q-field outlined label="Periculosidade" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ vilao.periculosidade.periculosidade }}
        </div>
      </template>
    </q-field>
    <slot></slot>
  </div>
</template>

<script>
import busca from "./mixins/metodos";

export default {
  props: ["vilao"],
  mixins: [busca],
};
</script>

<style></style>
