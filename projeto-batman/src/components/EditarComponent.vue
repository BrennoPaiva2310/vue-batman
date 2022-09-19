<template>
  <div class="row justify-center q-gutter-sm q-mt-md">
    <q-card class="my-card col-12 col-md-11">
      <Mensagem :abrir="abrir" :msg="msg"></Mensagem>
      <div class="row">
        <div class="col-12 col-md-6">
          <q-card-section>
            <div class="q-pa-md">
              <div class="q-gutter-md col" style="max-width: 100%">
                <q-input
                  standout
                  v-model="vilao.nome"
                  label="Nome do vilão"
                  lazy-rules
                />

                <q-input
                  v-model="vilao.dataUltimaVisualizacao"
                  filled
                  type="date"
                  hint="Data da sua ultima visualização"
                />

                <q-select
                  filled
                  v-model="vilao.status"
                  use-input
                  map-options
                  emit-value
                  option-value="vilao.status"
                  option-label="status"
                  stack-label
                  input-debounce="0"
                  label="Status"
                  :options="allStatus"
                  @filter="filterFn"
                  style="width: 250px"
                />

                <q-select
                  filled
                  v-model="vilao.periculosidade"
                  use-input
                  map-options
                  emit-value
                  option-value="vilao.periculosidade"
                  option-label="periculosidade"
                  stack-label
                  input-debounce="0"
                  label="Periculosidade"
                  :options="allPericulosidade"
                  @filter="filterFn"
                  style="width: 250px"
                />

                <q-select
                  filled
                  v-model="vilao.atividade"
                  use-input
                  map-options
                  emit-value
                  option-value="vilao.atividade"
                  option-label="atividade"
                  stack-label
                  input-debounce="0"
                  label="Atividade"
                  :options="allAtividade"
                  @filter="filterFn"
                  style="width: 250px"
                />

                <q-btn
                  color="white"
                  text-color="black"
                  label="Enviar"
                  @click="editar"
                />
              </div>
            </div>
          </q-card-section>
        </div>
        <div class="col-12 col-md-6">
          <q-card-section>
            <div class="q-pa-md">
              <Visualizacao :vilao="vilao"
                ><slot>
                  <q-field outlined label="Atividade" stack-label>
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ vilao.atividade.atividade }}
                      </div>
                    </template>
                  </q-field>
                  <q-field outlined label="Id do vilão" stack-label>
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ vilao.idVilao }}
                      </div>
                    </template>
                  </q-field>
                </slot>
              </Visualizacao>
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import Visualizacao from "../components/VisualizacaoComponente.vue";
import Mensagem from "./MensagemComponent.vue";
import busca from "./mixins/metodos";

export default {
  components: { Visualizacao, Mensagem },

  props: {
    id: {
      type: Number,
    },
  },

  created() {
    this.buscaPorId();

    this.buscarStatus();

    this.buscarPericulosidade();

    this.buscaAtividade();
  },
  mixins: [busca],
  data() {
    return {
      vilao: {
        idVilao: "",
        nome: "",
        dataUltimaVisualizacao: "",
        periculosidade: "",
        status: "",
        atividade: "",
      },
      allAtividade: [],
      allStatus: [],
      allPericulosidade: [],
      abrir: false,
      msg: "",
    };
  },

  methods: {
    editar() {
      try {
        this.$api.put("batman/editar", this.vilao).then((resp) => {
          this.msg = resp.data;
          this.abrir = !this.abrir;
          this.$emit("valorEmitido");
          this.retornarValor();
        });
      } catch (error) {
        this.msg = error;
      }
    },
  },
};
</script>

<style></style>
