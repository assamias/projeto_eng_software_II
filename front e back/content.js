// ==========================
// Conteúdo do Curso
// ==========================

export const modulos = [
  {
    titulo: "Módulo 1 - Conceitos de Diversidade",
    descricao: "Fundamentos da diversidade e sua importância na educação e na sociedade.",
    aulas: [
      {
        titulo: "O que é Diversidade?",
        conteudo: `
          <p>A diversidade diz respeito à variedade e coexistência de diferentes identidades, culturas, gêneros, etnias, religiões e formas de ser no mundo.</p>
          <p>No campo educacional, reconhecer a diversidade é essencial para criar ambientes inclusivos, democráticos e respeitosos.</p>
        `
      },
      {
        titulo: "Críticas ao Multiculturalismo",
        conteudo: `
          <p>O multiculturalismo hegemônico muitas vezes reduz culturas a estereótipos e não enfrenta as desigualdades estruturais.</p>
          <p>Um olhar crítico busca valorizar as diferenças sem apagar as desigualdades.</p>
        `
      }
    ],
    quiz: {
      perguntas: [
        {
          questao: "Diversidade significa:",
          opcoes: [
            "Uniformidade de pensamento e cultura.",
            "Reconhecimento e respeito às diferenças.",
            "Redução de desigualdades sociais apenas.",
            "Homogeneização cultural."
          ],
          correta: 1
        },
        {
          questao: "O multiculturalismo hegemônico é criticado porque:",
          opcoes: [
            "Apaga as diferenças.",
            "Reduz culturas a estereótipos.",
            "Resolve todas as desigualdades.",
            "Elimina preconceitos por completo."
          ],
          correta: 1
        }
      ]
    }
  },
  {
    titulo: "Módulo 2 - Gestão Democrática",
    descricao: "A gestão democrática como prática de inclusão e participação coletiva.",
    aulas: [
      {
        titulo: "O que é Gestão Democrática?",
        conteudo: `
          <p>A gestão democrática na educação garante a participação de professores, estudantes, famílias e comunidade nas decisões escolares.</p>
          <p>Ela promove a corresponsabilidade e fortalece o espaço escolar como ambiente de cidadania.</p>
        `
      },
      {
        titulo: "Desafios da Gestão Democrática",
        conteudo: `
          <p>Apesar de prevista em lei, a gestão democrática enfrenta obstáculos como autoritarismo, desigualdade de participação e falta de recursos.</p>
        `
      }
    ],
    quiz: {
      perguntas: [
        {
          questao: "A gestão democrática busca:",
          opcoes: [
            "Centralizar decisões na direção escolar.",
            "Exclusão da comunidade escolar.",
            "Participação coletiva nas decisões.",
            "Evitar a corresponsabilidade."
          ],
          correta: 2
        }
      ]
    }
  },
  {
    titulo: "Módulo 3 - Movimentos Sociais",
    descricao: "O papel dos movimentos sociais na luta por direitos e inclusão.",
    aulas: [
      {
        titulo: "Movimentos Sociais e Educação",
        conteudo: `
          <p>Movimentos sociais desempenham papel central na conquista de direitos educacionais e na denúncia de práticas excludentes.</p>
          <p>Exemplos incluem o movimento negro, indígena, feminista e LGBTQIA+.</p>
        `
      }
    ],
    quiz: {
      perguntas: [
        {
          questao: "Os movimentos sociais têm papel importante porque:",
          opcoes: [
            "Limitam a diversidade.",
            "Garantem direitos e inclusão.",
            "Enfraquecem a democracia.",
            "Eliminam o debate crítico."
          ],
          correta: 1
        }
      ]
    }
  }
];
