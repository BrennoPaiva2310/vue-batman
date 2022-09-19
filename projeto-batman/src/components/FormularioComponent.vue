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
                  ref="inputRef"
                  v-model="vilao.nome"
                  label="Nome do vilão"
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

                <q-btn
                  color="white"
                  text-color="black"
                  label="Enviar"
                  @click="salvar()"
                />

                <q-btn
                  color="white"
                  text-color="black"
                  label="Consultar"
                  @click="abrirConsultar()"
                />
                <q-btn
                  color="white"
                  text-color="black"
                  label="Limpar"
                  @click="limpar()"
                />
              </div>
            </div>
          </q-card-section>
        </div>
        <div class="col-12 col-md-6">
          <q-card-section>
            <div class="q-pa-md">
              <Visualizacao :vilao="vilao" />
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
  mixins: [busca],
  created() {
    this.buscarStatus();
    this.buscarPericulosidade();
  },
  data() {
    return {
      vilao: {
        nome: "",
        dataUltimaVisualizacao: "",
        periculosidade: "",
        status: "",
        atividade: {
          idAtividade: 1,
          atividade: "Sim",
        },
      },
      abrir: false,
      msg: "",
      consultar: false,
      allStatus: [],
      allPericulosidade: [],
    };
  },

  methods: {
    limpar() {
      this.vilao.nome = "";
      this.vilao.dataUltimaVisualizacao = "";
      this.vilao.periculosidade = "";
      this.vilao.status = "";
    },

    salvar() {
      try {
        this.$api.post("batman", this.vilao).then((resp) => {
          this.limpar();
          this.msg = resp.data;
          this.abrir = !this.abrir;
          this.retornarValor();
        });
      } catch (error) {
        this.msg = error;
      }
    },
    abrirConsultar() {
      this.$emit("valorEmitido", !this.consultar);
      this.consultar = !this.consultar;
    },
  },
};
</script>

<style></style>
