import { api } from "src/boot/axios";
export default {
  methods: {
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
    retornarValor() {
      setTimeout(() => {
        this.abrir = false;
      }, 1000);
    },

    buscarStatus() {
      this.$api.get("status").then((resp) => {
        this.allStatus = resp.data;
      });
    },

    buscarPericulosidade() {
      this.$api.get("periculosidade").then((resp) => {
        this.allPericulosidade = resp.data;
      });
    },

    buscaPorId() {
      this.$api.get(`batman/${this.id}`).then((resp) => {
        this.vilao = { ...resp.data };
      });
    },

    buscaAtividade() {
      this.$api.get("atividade").then((resp) => {
        this.allAtividade = resp.data;
      });
    },

    formatarData(data) {
      let dataExplode = data.split("-");
      let dataFormatada = `${dataExplode[2]}/${dataExplode[1]}/${dataExplode[0]}`;
      if (data === "") {
        return "";
      } else {
        return dataFormatada;
      }
    },
  },
};
