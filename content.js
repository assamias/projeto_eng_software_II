// Conteúdo do curso baseado no artigo fornecido (resumo e adaptação didática).
const COURSE = {
  title: "Diversidade na Educação, Gestão e Movimentos Sociais",
  modules: [
    {
      id: "m1",
      title: "Conceitos de Diversidade e Críticas",
      minutes: 25,
      lessons: [
        {
          id: "m1l1",
          title: "O que é 'diversidade' no contexto educacional?",
          html: `
          <p>A diversidade é multifacetada e frequentemente confundida com diversidade cultural. O artigo destaca que tratar diversidade apenas como "harmonia" ignora conflitos reais que derivam de desigualdades materiais.</p>
          <ul>
            <li>Diversidade ≠ apenas variedade cultural; envolve disputas e contextos sociais.</li>
            <li>Conflito e movimento são parte constitutiva da diversidade.</li>
          </ul>
          `
        },
        {
          id: "m1l2",
          title: "UNESCO, multiculturalismo e mercado",
          html: `
          <p>Documentos hegemônicos (ex.: UNESCO) enfatizam tolerância, diálogo e coesão, mas isso pode atenuar o caráter conflitual e estrutural das desigualdades.</p>
          <ul>
            <li>Risco: políticas compensatórias que minimizam conflitos sem enfrentar desigualdades.</li>
            <li>Mercado e "gestão da diversidade" podem capturar a pauta como marketing.</li>
          </ul>
          `
        }
      ],
      quiz: [
        {
          q: "Segundo o curso, por que diversidade não deve ser vista apenas como 'harmonia'?",
          a: ["Porque ela envolve conflito e movimento relacionados a desigualdades materiais.", "Porque a UNESCO proíbe esse conceito.", "Porque não existem desigualdades na escola.", "Porque o mercado já resolveu o tema."],
          correct: 0
        }
      ]
    },
    {
      id: "m2",
      title: "Diversidade, Diferença, Desigualdade e Igualdade",
      minutes: 25,
      lessons: [
        {
          id: "m2l1",
          title: "Diferença vs. Desigualdade",
          html: `
            <p>As diferenças (étnicas, culturais, de gênero etc.) se materializam como desigualdades em contextos capitalistas. Políticas públicas devem partir da desigualdade como ponto de partida e ter a igualdade como horizonte.</p>
            <ul>
              <li>Tratar igualmente os desiguais mantém desigualdades.</li>
              <li>Políticas afirmativas são um caminho de equidade efetiva.</li>
            </ul>
          `
        },
        {
          id: "m2l2",
          title: "Totalidade e classe social",
          html: `
            <p>Inspirado em Marx, o concreto é síntese de múltiplas determinações. A diversidade compõe a totalidade social; classe continua sendo categoria explicativa central.</p>
          `
        }
      ],
      quiz: [
        {
          q: "Qual é a lógica correta para políticas de diversidade?",
          a: ["Partir da desigualdade e mirar a igualdade.", "Tratar todos iguais desde o início.", "Focar só em pluralidade cultural.", "Substituir o Estado por ONGs."],
          correct: 0
        }
      ]
    },
    {
      id: "m3",
      title: "Movimentos Sociais e o Princípio Educativo",
      minutes: 20,
      lessons: [
        {
          id: "m3l1",
          title: "Diversidade como movimento",
          html: `
            <p>Diversidade implica movimento e conflito, aproximando-se da práxis dos movimentos sociais. Há um princípio educativo nos movimentos (formação política, produção de saberes).</p>
          `
        },
        {
          id: "m3l2",
          title: "Direitos e emancipação",
          html: `
            <p>Os movimentos sociais organizam demandas por direitos e aproximam diversidade de um projeto de emancipação humana e social.</p>
          `
        }
      ],
      quiz: [
        {
          q: "O que os movimentos sociais agregam ao tema da diversidade?",
          a: ["Articulação de direitos e horizonte emancipatório.", "Apenas festas culturais.", "Retirada do conflito.", "Subordinação à lógica de mercado."],
          correct: 0
        }
      ]
    },
    {
      id: "m4",
      title: "Gestão Democrática da Educação",
      minutes: 25,
      lessons: [
        {
          id: "m4l1",
          title: "Participação e escola como movimento da sociedade",
          html: `
            <p>Gestão democrática exige participação real de comunidade, estudantes e movimentos na vida escolar e nas decisões (não apenas assentos formais).</p>
          `
        },
        {
          id: "m4l2",
          title: "Preconceito e gestão",
          html: `
            <p>Não há gestão democrática com práticas preconceituosas. Formação e condições estruturais devem enfrentar racismos, sexismos e outras formas de opressão.</p>
          `
        }
      ],
      quiz: [
        {
          q: "Qual condição é indispensável para gestão democrática?",
          a: ["Participação efetiva e enfrentamento de preconceitos.", "Decisões só da direção.", "Ter um PPP com a palavra 'democrática'.", "Ter conselho escolar sem poder real."],
          correct: 0
        }
      ]
    },
    {
      id: "m5",
      title: "Políticas Públicas de Diversidade",
      minutes: 25,
      lessons: [
        {
          id: "m5l1",
          title: "Estado, sociedade civil e disputas",
          html: `
            <p>Desde os anos 2000, houve ampliação de políticas de diversidade, com disputas internas de sentidos (inclusão, ações afirmativas, políticas da diferença). Fragmentação é um risco.</p>
          `
        },
        {
          id: "m5l2",
          title: "Controle social e implementação",
          html: `
            <p>Movimentos devem tensionar e controlar o Estado para evitar esvaziamento das demandas e assegurar implementação consistente.</p>
          `
        }
      ],
      quiz: [
        {
          q: "Qual risco em políticas de diversidade sem controle social?",
          a: ["Esvaziar as demandas dos movimentos.", "Aumentar a participação popular.", "Superar todas as desigualdades automaticamente.", "Acabar com a fragmentação."],
          correct: 0
        }
      ]
    },
    {
      id: "m6",
      title: "Práxis Educacional e Certificação",
      minutes: 15,
      lessons: [
        {
          id: "m6l1",
          title: "Da teoria à prática",
          html: `
            <p>Trazer os temas da diversidade como conteúdos transversais, projetos comunitários e práticas pedagógicas que liguem escola e território.</p>
          `
        },
        {
          id: "m6l2",
          title: "Conclusão e certificado",
          html: `
            <p>Ao finalizar todas as unidades e quizzes, você poderá gerar um certificado de conclusão (simples) como comprovação de estudo.</p>
          `
        }
      ],
      quiz: [
        {
          q: "Qual prática aproxima escola e diversidade de um projeto emancipatório?",
          a: ["Projetos e conteúdos que ligam escola e território.", "Somente celebrações simbólicas.", "Eliminar debates sobre classe.", "Privatizar a gestão escolar."],
          correct: 0
        }
      ]
    }
  ]
};
