# EnergyCalc 🌍⚡

## **Descrição do Projeto**

EnergyCalc é uma aplicação voltada para simulações de consumo de energia com foco em sustentabilidade. O sistema permite que os usuários calculem e comparem os custos e benefícios de diferentes tipos de energia, como solar, eólica e hídrica. Além disso, fornece um histórico das simulações realizadas, ajudando os usuários a tomarem decisões baseadas em dados reais.

![Tela Inicial do EnergyCalc](https://raw.githubusercontent.com/Tcapela/GS2---FRONT/main/energy-calc/tela-inicial.png "Tela Inicial do EnergyCalc")


---

## **Links**

- **Vercel:** https://energy-calc-sigma.vercel.app/home
- **Github:** https://github.com/TCapela/GS2---FRONT.git
- **Youtube:** https://youtu.be/sQr8eLlwe48

## **Objetivo do Projeto**

- Fornecer uma ferramenta intuitiva e acessível para simular diferentes tipos de energia.
- Aumentar a conscientização sobre a importância do uso de energia renovável.
- Auxiliar na tomada de decisão para reduzir custos energéticos.

---

## **Equipe de Desenvolvimento**

| Nome                       | RM       | Turma  |
|----------------------------|----------|--------|
| Raphaela Oliveira Tatto    | RM554983 | 1TDSPO |
| Lucas Rodrigues de Souza   | RM557951 | 1TDSPO |
| Tiago Ribeiro Capela       | RM558021 | 1TDSPO |

---

## **Tecnologias Utilizadas**

### **Frontend**
- **React.js** com **Next.js** ⚛️
- **TypeScript** para tipagem estática 🛠️
- **Tailwind CSS** para estilização responsiva 🎨

### **Backend**
- **Java** com **Jakarta EE** ☕
- **JPA (Java Persistence API)** para interação com o banco de dados 📦
- **H2 Database** para desenvolvimento local e **OracleDatabase** para produção 🗄️
- **API RESTful** com suporte a CORS

### **Bibliotecas Adicionais**
- **Vercel** para deploy contínuo 🚀
- **MARP** para apresentação dinâmica de documentação 📄
- **Postman** para testes de API 🔧

---

## **Funcionalidades**

1. **Simulação de Consumo**
   - Permite calcular o consumo e os custos com base nos dados fornecidos pelo usuário.

   ![Simulação de Consumo](./public/imgs/readme-imgs/profile.png "Tela de Simulação de Consumo do EnergyCalc")

2. **Histórico de Simulações**
   - Exibe uma lista de simulações realizadas pelo usuário.

   ![historico](./public/imgs/readme-imgs/historico.png "Tela de histrico do EnergyCalc")

3. **Login e Registro**
   - Controle de acesso seguro.

    ![Modal de Login](./public/imgs/readme-imgs/login-modal.png "Modal de Login do EnergyCalc")
    ![Modal de Cadastro]([./public/imgs/readme-imgs/cadastro-modal.png](https://github.com/TCapela/GS2---FRONT/blob/main/energy-calc/cadastro-modal.png) "Modal de Cadastro do EnergyCalc")

4. **Mensagens Dinâmicas**
   - Exibe mensagens claras sem o uso de `alert()`.

5. **Modal de Exclusão**
   - Confirma exclusões de forma intuitiva e amigável.

   ![excluir](./public/imgs/readme-imgs/excluir-historico.png "Tela de exluir do EnergyCalc")

6. **Modal de Edição**
   - Edita as informções das simulções.

   ![excluir](./public/imgs/readme-imgs/editar-historico.png "Tela de editar do EnergyCalc")
---

## **Como Executar o Projeto**

### **Requisitos**

- Node.js versão 16+ 🔧
- Java 17+ ☕
- Oracle Database 🎲
- Navegador atualizado 🌐

### **Passos para Instalação**

#### **1. Clone o repositório**
```bash
git clone https://github.com/TCapela/GS2---FRONT.git
cd global-solution
cd energy-calc
npm i
npm run dev
