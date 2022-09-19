<template>
  <div class="row justify-center q-gutter-xl">
    <q-card class="my-card col-12 col-md-10">
      <Mensagem :abrir="abrir" :msg="msg"></Mensagem>

      <q-card-section>
        <div class="q-pa-md">
          <div class="q-pa-md">
            <div class="q-gutter-md row items-start justify-start">
              <q-input
                filled
                type="text"
                label="Nome"
                v-model="pesquisa.nome"
              />

              <q-select
                filled
                v-model="pesquisa.periculosidade"
                use-input
                map-options
                emit-value
                option-value="pesquisa.periculosidade"
                option-label="periculosidade"
                stack-label
                input-debounce="0"
                label="Periculosidade"
                :options="allPericulosidade"
                style="width: 180px"
              />

              <q-select
                filled
                v-model="pesquisa.status"
                use-input
                map-options
                emit-value
                option-value="pesquisa.status"
                option-label="status"
                stack-label
                input-debounce="0"
                label="Status"
                :options="allStatus"
                style="width: 180px"
              />

              <q-btn
                color="white"
                text-color="black"
                label="Pesquisar"
                @click="pesquisar"
              />
            </div>
          </div>
          <q-table
            title="Vilões"
            :rows="post"
            :columns="columns"
            row-key="name"
            no-data-label="Sem vilões para exibir"
          >
            <template v-slot:body-cell-dataUltimaVisualizacao="props">
              <q-td :props="props">
                {{ formatarData(props.row.dataUltimaVisualizacao) }}
              </q-td>
            </template>
            <template v-slot:body-cell-periculosidade="props">
              <q-td :props="props">
                {{ props.row.periculosidade.periculosidade }}
              </q-td>
            </template>
            <template v-slot:body-cell-atividade="props">
              <q-td :props="props">
                {{ props.row.atividade.atividade }}
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                {{ props.row.status.status }}
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="q-gutter-md col">
                  <q-btn
                    icon="delete"
                    color="negative"
                    @click="mandarIdExcluir(props.row.idVilao)"
                  />

                  <q-btn
                    icon="edit"
                    color="black"
                    @click="mandaIdEditar(props.row.idVilao)"
                  />
                </div>
              </q-td>
              <q-dialog v-model="confirm">
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar
                      icon="delete"
                      color="negative"
                      text-color="white"
                    />
                    <span class="q-ml-sm"
                      >Você realmente deseja deletar esse vilão?
                    </span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Não" color="primary" v-close-popup />
                    <q-btn
                      flat
                      label="Sim"
                      color="primary"
                      v-close-popup
                      @click="deletar"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog v-model="prompt">
                <q-card style="min-width: 1200px">
                  <Editar
                    :id="id"
                    :pesquisar="pesquisar"
                    @valorEmitido="atualizar()"
                  >
                  </Editar>
                </q-card>
              </q-dialog>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const columns = [
  {
    name: "idVilao",
    align: "center",
    label: "Id do Vilão",
    field: "idVilao",
    sortable: true,
  },
  {
    name: "Nome",
    align: "center",
    label: "Nome",
    field: "nome",
    sortable: true,
  },
  {
    name: "dataUltimaVisualizacao",
    align: "center",
    label: "Data de sua ultima visualização",
    field: "dataUltimaVisualizacao",
    sortable: true,
  },

  {
    name: "periculosidade",
    align: "center",
    label: "Periculosidade",
    field: "periculosidade",
  },
  {
    name: "atividade",
    align: "center",
    label: "Ativo",
    field: "atividade",
  },

  {
    name: "status",
    align: "center",
    label: "Status",
  },
  {
    name: "action",
    align: "center",
    label: "Ações",
  },
];
import Editar from "./EditarComponent.vue";
import Mensagem from "./MensagemComponent.vue";
import busca from "./mixins/metodos";

export default {
  components: { Editar, Mensagem },

  mixins: [busca],
  mounted() {
    this.buscarStatus();
    this.buscarPericulosidade();
    this.pesquisar();
  },

  data() {
    return {
      columns,

      confirm: false,
      prompt: false,
      id: "",
      post: [],
      pesquisa: {
        nome: "",
        periculosidade: null,
        status: null,
      },
      abrir: false,
      msg: "",
      allPericulosidade: [],
      allStatus: [],
    };
  },
  watch: {},

  methods: {
    mandarIdExcluir(id) {
      this.id = id;
      this.confirm = !this.confirm;
    },

    pesquisar() {
      let urlStatus =
        this.pesquisa.status != null || this.pesquisa.status === ""
          ? `&status=${this.pesquisa.status.idStatus}`
          : "";
      let urlPericulosidade =
        this.pesquisa.periculosidade || this.pesquisa.periculosidade === ""
          ? `&periculosidade=${this.pesquisa.periculosidade.idPericulosidade}`
          : "";
      let valores;
      this.$api
        .get(
          `batman?nome=${this.pesquisa.nome}${urlPericulosidade}${urlStatus}`
        )
        .then((resp) => {
          this.post = resp.data;
        });
    },
    mandaIdEditar(id) {
      this.id = id;
      this.prompt = !this.prompt;
    },

    limparPesquisa() {
      this.pesquisa.nome = "";
      this.pesquisa.periculosidade = "";
      this.pesquisa.status = "";
    },
    deletar() {
      try {
        this.$api.delete(`batman/${this.id}`).then((resp) => {
          this.msg = resp.data;
          this.abrir = !this.abrir;
          this.retornarValor();
          this.atualizar();
        });
      } catch (error) {
        this.msg = error;
      }
    },

    atualizar() {
      this.$api.get("batman").then((resp) => {
        this.post = resp.data;
      });
    },
  },
};
</script>

<style></style>
