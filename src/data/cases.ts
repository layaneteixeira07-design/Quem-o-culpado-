import { CaseDossier } from '../types/game';

export const CASES_DATA: CaseDossier[] = [
  {
    id: 'caso-1',
    title: 'O Roubo do Rubi Sangue de Dragão',
    codeName: 'CASO #01 - MANSÃO VALENÇA',
    difficulty: 'Fácil',
    estimatedTime: '8-12 min',
    crimeType: 'Roubo de Joia de R$ 5 Milhões',
    location: 'Mansão Valença, Petrópolis - RJ',
    timestamp: 'Quinta-feira, 22h45 (Noite de Tempestade)',
    unlockPointsRequired: 0,
    synopsis: 'Durante uma forte tempestade que cortou momentaneamente a energia da mansão histórica, o lendário Rubi Sangue de Dragão de 50 quilates desapareceu do cofre secreto com teclado digital na biblioteca particular do Barão.',
    detectiveNotes: 'O cofre não apresentava sinais de arrombamento com explosivos ou pé de cabra. Apenas quatro pessoas estavam no casarão após as portas serem trancadas pelo mordomo. O ladrão sabia o código ou o obteve momentos antes.',
    scenes: [
      {
        id: 'scene-biblioteca',
        name: 'Biblioteca & Cofre',
        description: 'Amplo salão forrado de carvalho escuro. O cofre atrás do quadro renascentista está escancarado.',
        ambientTone: 'from-amber-950/40 via-slate-900 to-black',
        icon: 'BookOpen',
        hotspots: [
          {
            id: 'hs-cofre',
            title: 'Teclado Digital do Cofre',
            x: 48,
            y: 38,
            clueId: 'clue-po-grafite',
            inspectionText: 'O painel do cofre mostra pó fino de grafite espalhado pelas teclas 2, 7, 9 e 4. Alguém usou técnica de revelação para descobrir quais teclas eram pressionadas com frequência!',
            hintText: 'Examine o teclado digital do cofre'
          },
          {
            id: 'hs-taca-vinho',
            title: 'Taça de Cristal na Mesa',
            x: 25,
            y: 65,
            clueId: 'clue-batom-taca',
            inspectionText: 'Uma taça de cristal com conhaque pela metade. Na borda, há uma marca nítida de batom cor Vermelho Carmim vibrante.',
            hintText: 'Verifique a mesa de centro perto das poltronas'
          },
          {
            id: 'hs-lixeira',
            title: 'Cesto de Papéis ao lado da Escrivaninha',
            x: 78,
            y: 72,
            clueId: 'clue-papel-senha',
            inspectionText: 'Uma folha rasgada de bloco de notas com o timbre pessoal da secretária. No rascunho amassado lê-se: "Barão pediu alteração de senha: 2-9-4-7 às 18h".',
            hintText: 'Investigue o cesto de descarte de papéis'
          }
        ]
      },
      {
        id: 'scene-jardim',
        name: 'Jardim de Inverno & Porta dos Fundos',
        description: 'Corredor de vidro com plantas exóticas que dá acesso à saída de emergência dos fundos.',
        ambientTone: 'from-emerald-950/40 via-slate-900 to-black',
        icon: 'Flower2',
        hotspots: [
          {
            id: 'hs-roseira',
            title: 'Roseira com Espinhos na Janela',
            x: 35,
            y: 50,
            clueId: 'clue-tecido-verde',
            inspectionText: 'Preso nos espinhos pontiagudos da roseira, você encontra um retalho de tecido de cetim Verde Esmeralda recém-rasgado, ainda úmido da chuva.',
            hintText: 'Olhe atentamente para os espinhos próximos à janela entreaberta'
          },
          {
            id: 'hs-pegada',
            title: 'Marca de Pegada na Lama',
            x: 65,
            y: 80,
            clueId: 'clue-pegada-salto',
            inspectionText: 'Uma pegada solitária impressa na terra molhada: sapato de salto fino agulha, tamanho feminino 36/37, apontando na direção do estacionamento.',
            hintText: 'Verifique o piso de terra e cascalho no chão'
          }
        ]
      },
      {
        id: 'scene-escritorio',
        name: 'Gabinete da Secretária',
        description: 'Mesa de trabalho de Clara Bittencourt, cheia de pastas de contabilidade e correspondências.',
        ambientTone: 'from-blue-950/40 via-slate-900 to-black',
        icon: 'FileText',
        hotspots: [
          {
            id: 'hs-bolsa',
            title: 'Bolsa de Mão sobre a Cadeira',
            x: 42,
            y: 55,
            clueId: 'clue-bolsa-batom',
            inspectionText: 'Dentro da bolsa de Clara, você encontra um estojo dourado de batom Vermelho Carmim idêntico ao encontrado na taça da biblioteca e uma chave de armário trancado.',
            hintText: 'Inspecione a bolsa esquecida sobre a poltrona'
          },
          {
            id: 'hs-gaveta',
            title: 'Gaveta Trancada do Arquivo',
            x: 75,
            y: 45,
            clueId: 'clue-recibo-penhor',
            inspectionText: 'Atrás de contratos antigos, há uma correspondência de um contrabandista no exterior oferecendo R$ 2.000.000 pelo rubi em diamantes não rastreáveis!',
            hintText: 'Confira as pastas no fundo da gaveta'
          }
        ]
      }
    ],
    suspects: [
      {
        id: 'susp-arthur',
        name: 'Arthur Valença',
        role: 'Sobrinho e Herdeiro Endividado',
        age: 32,
        gender: 'M',
        avatarBg: 'bg-amber-900/40 border-amber-600',
        avatarIcon: 'User',
        bio: 'Playboy conhecido nos cassinos clandestinos da capital. Está com cobranças judiciais pesadas acumuladas.',
        alibi: 'Afirma que estava no salão de jogos fumando um charuto e tentando se acalmar após uma discussão com o tio.',
        initialMotive: 'Precisa desesperadamente de dinheiro para pagar agiotas que ameaçaram sua integridade física.',
        nervousness: 65,
        isCulprit: false,
        questions: [
          {
            id: 'q-arthur-1',
            question: 'Onde você estava às 22h45 durante a queda de energia?',
            answer: 'Eu estava no salão de jogos! A luz piscou e eu procurei um isqueiro. Ouvi um barulho na biblioteca, fui até a porta mas ela estava trancada!',
            isLie: false
          },
          {
            id: 'q-arthur-2',
            question: 'Você sabia a senha do cofre do seu tio?',
            answer: 'Eu tentei a data de nascimento dele várias vezes semana passada, mas ele mudou o sistema recentemente! Eu não faço a menor ideia do código novo!',
            isLie: false,
            revealNotes: 'Arthur tentou furtar antes, mas o código foi trocado hoje mesmo.'
          },
          {
            id: 'q-arthur-3',
            question: 'Por que seus sapatos estão sem nenhuma gota de lama?',
            answer: 'Porque passei a noite inteira dentro de casa com meus mocassins italianos! Quem foi lá fora na chuva se sujou todo!',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-helena',
        name: 'Dra. Helena Mendes',
        role: 'Curadora e Gemóloga Especialista',
        age: 45,
        gender: 'F',
        avatarBg: 'bg-indigo-900/40 border-indigo-500',
        avatarIcon: 'GraduationCap',
        bio: 'Especialista convidada pelo Barão para avaliar a joia antes de um possível leilão no Louvre.',
        alibi: 'Diz que estava em seu quarto de hóspedes conferindo relatórios microscópicos da joia no laptop.',
        initialMotive: 'Fascinada academicamente por gemas raras; poderia desejar a peça para estudo exclusivo.',
        nervousness: 30,
        isCulprit: false,
        questions: [
          {
            id: 'q-helena-1',
            question: 'Qual foi sua última interação com o Barão e a joia?',
            answer: 'Guardei o rubi pessoalmente às 18h no cofre. O Barão fechou a porta e digitou o código sem me deixar olhar. Sou profissional, vivo da minha reputação!',
            isLie: false
          },
          {
            id: 'q-helena-2',
            question: 'Você usa maquiagem ou batom vermelho?',
            answer: 'Detesto batons fortes. Sempre uso gloss neutro ou protetor labial. Olhe minha bolsa se quiser conferir.',
            isLie: false
          },
          {
            id: 'q-helena-3',
            question: 'Você viu alguém suspeito rondando os corredores?',
            answer: 'Vi a secretária Clara com um vestido verde esmeralda elegante conversando ao telefone em tom baixo perto das 22h30.',
            isLie: false,
            revealNotes: 'Helena confirma que Clara vestia verde esmeralda pouco antes do crime.'
          }
        ]
      },
      {
        id: 'susp-gaspar',
        name: 'Gaspar Ramos',
        role: 'Mordomo-Chefe da Família',
        age: 63,
        gender: 'M',
        avatarBg: 'bg-slate-800 border-slate-600',
        avatarIcon: 'KeyRound',
        bio: 'Trabalha para os Valença há mais de 35 anos. Conhece cada centímetro da propriedade como a palma da mão.',
        alibi: 'Afirma que desceu para a cozinha para preparar o chá de camomila do Barão e conferir a prataria.',
        initialMotive: 'Rancor antigo por não ter recebido aumento nos últimos 5 anos.',
        nervousness: 20,
        isCulprit: false,
        questions: [
          {
            id: 'q-gaspar-1',
            question: 'O senhor possui as chaves de todas as portas da mansão?',
            answer: 'Sim, senhor detetive. Mas o cofre do Barão é 100% eletrônico. Nem mesmo eu jamais soube a combinação.',
            isLie: false
          },
          {
            id: 'q-gaspar-2',
            question: 'O senhor serviu bebida na biblioteca esta noite?',
            answer: 'Servi conhaque para o senhor Arthur e para o Barão por volta das 21h. Recolhi os copos depois. Não deixei nenhuma taça com batom lá.',
            isLie: false
          },
          {
            id: 'q-gaspar-3',
            question: 'Alguém calça sapatos de salto agulha nesta casa?',
            answer: 'Dona Helena usa calçados ortopédicos baixos confortáveis. A única que sempre usa salto agulha é a senhorita Clara.',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-clara',
        name: 'Clara Bittencourt',
        role: 'Secretária Pessoal do Barão',
        age: 27,
        gender: 'F',
        avatarBg: 'bg-emerald-900/40 border-emerald-500',
        avatarIcon: 'Sparkles',
        bio: 'Trabalha como secretária e assistente de confiança há 2 anos. Tem acesso às correspondências e agenda privada.',
        alibi: 'Diz que tomou um remédio para dor de cabeça e foi dormir em seu quarto anexo às 21h30 em ponto, vestindo seu pijama.',
        initialMotive: 'Dívidas familiares e um plano audacioso de recomeçar a vida no exterior.',
        nervousness: 88,
        isCulprit: true,
        questions: [
          {
            id: 'q-clara-1',
            question: 'Você confirma que foi dormir às 21h30 e não saiu mais do quarto?',
            answer: 'Sim, tomei um chá com comprimido e apaguei! Só acordei com a gritaria da polícia às 23h30!',
            isLie: true,
            contradictedByClueId: 'clue-tecido-verde',
            revealNotes: 'CONTRADIÇÃO! Ela diz que estava de pijama dormindo, mas Helena a viu às 22h30 de vestido verde, e um retalho do vestido foi achado na roseira molhada!'
          },
          {
            id: 'q-clara-2',
            question: 'Você esteve na biblioteca durante a noite?',
            answer: 'Nunca! O Barão não me permite entrar na biblioteca desacompanhada. Não tomei nada lá!',
            isLie: true,
            contradictedByClueId: 'clue-batom-taca',
            revealNotes: 'CONTRADIÇÃO! A taça de conhaque na biblioteca continha o mesmo batom Vermelho Carmim que está na bolsa de Clara!'
          },
          {
            id: 'q-clara-3',
            question: 'Você sabia a nova senha do cofre?',
            answer: 'Não, o Barão nunca compartilha as senhas comigo, ele é extremamente desconfiado!',
            isLie: true,
            contradictedByClueId: 'clue-papel-senha',
            revealNotes: 'CONTRADIÇÃO! O bilhete no cesto de lixo com a caligrafia e timbre de Clara comprova que ela mesma anotou a troca de senha para 2-9-4-7!'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue-po-grafite',
        title: 'Pó de Grafite nas Teclas',
        category: 'Forense',
        description: 'Pó de grafite fino revelando impressões digitais nas teclas 2, 7, 9 e 4 do cofre.',
        sceneName: 'Biblioteca & Cofre',
        iconName: 'Fingerprint',
        isKeyEvidence: false,
        relevanceNote: 'Mostra quais números foram digitados no cofre para abri-lo.'
      },
      {
        id: 'clue-batom-taca',
        title: 'Batom Carmim na Taça de Conhaque',
        category: 'Forense',
        description: 'Marca nítida de batom Vermelho Carmim na borda de uma taça de conhaque na biblioteca.',
        sceneName: 'Biblioteca & Cofre',
        iconName: 'Wine',
        isKeyEvidence: true,
        relevanceNote: 'Prova incontestável de que uma mulher maquiada esteve na biblioteca durante o roubo.'
      },
      {
        id: 'clue-papel-senha',
        title: 'Rascunho da Senha no Lixo',
        category: 'Documento',
        description: 'Papel com anotação da nova senha 2-9-4-7 no timbre pessoal da secretária Clara.',
        sceneName: 'Biblioteca & Cofre',
        iconName: 'FileQuestion',
        isKeyEvidence: true,
        relevanceNote: 'Desmonta a afirmação de Clara de que nunca soube a nova senha do cofre.'
      },
      {
        id: 'clue-tecido-verde',
        title: 'Retalho de Cetim Verde Esmeralda',
        category: 'Objeto Pessoal',
        description: 'Pedaço de tecido verde esmeralda preso na roseira pontiaguda da janela de fuga.',
        sceneName: 'Jardim de Inverno',
        iconName: 'Scissors',
        isKeyEvidence: true,
        relevanceNote: 'Pertence ao vestido que Clara usava naquela noite, provando sua rota de fuga.'
      },
      {
        id: 'clue-pegada-salto',
        title: 'Pegada de Salto Agulha Tam. 36',
        category: 'Forense',
        description: 'Pegada de calçado feminino fino na lama dos fundos em direção ao portão secundário.',
        sceneName: 'Jardim de Inverno',
        iconName: 'Footprints',
        isKeyEvidence: false,
        relevanceNote: 'Confirma o porte físico e o calçado usado pelo fugitivo.'
      },
      {
        id: 'clue-bolsa-batom',
        title: 'Batom Carmim na Bolsa de Clara',
        category: 'Objeto Pessoal',
        description: 'Estojo de batom cor Vermelho Carmim encontrado dentro da bolsa da secretária.',
        sceneName: 'Gabinete da Secretária',
        iconName: 'Sparkle',
        isKeyEvidence: false,
        relevanceNote: 'Conecta diretamente a marca da taça na cena do crime à secretária.'
      },
      {
        id: 'clue-recibo-penhor',
        title: 'Proposta Clandestina de Compra',
        category: 'Documento',
        description: 'Correspondência secreta oferecendo R$ 2.000.000 em dinheiro pela entrega do Rubi.',
        sceneName: 'Gabinete da Secretária',
        iconName: 'DollarSign',
        isKeyEvidence: true,
        relevanceNote: 'Revela o motivo premeditado de Clara para trair seu empregador.'
      }
    ],
    culpritId: 'susp-clara',
    keyEvidenceId: 'clue-papel-senha',
    trueMotiveId: 'mot-venda-clandestina',
    motiveOptions: [
      { id: 'mot-vinganca-familiar', label: 'Vingança por herança não paga pelo Barão', isCorrect: false },
      { id: 'mot-venda-clandestina', label: 'Vender o rubi no mercado negro para fugir com R$ 2 milhões', isCorrect: true },
      { id: 'mot-pagar-divida-jogo', label: 'Pagar dívidas de cassino com agiotas perigosos', isCorrect: false },
      { id: 'mot-estudo-academico', label: 'Exibir a peça em um museu internacional na Europa', isCorrect: false }
    ],
    trueMethodId: 'meth-copia-senha-janela',
    methodOptions: [
      { id: 'meth-arrombamento-explosivo', label: 'Explodiu o cofre usando dinamite trazida no casaco', isCorrect: false },
      { id: 'meth-copia-senha-janela', label: 'Anotou a senha secreta, abriu o cofre na queda de luz e fugiu pela janela do jardim', isCorrect: true },
      { id: 'meth-sedativo-vinho', label: 'Dormiu todos com sonífero no jantar e pegou a chave mestra do mordomo', isCorrect: false }
    ],
    solutionSummary: {
      confession: '"Eu não aguentava mais ver o Barão gastar fortunas enquanto minha família passava necessidades! O comprador em Zurique já havia prometido meu passaporte e o pagamento em conta criptográfica. Eu peguei a senha quando ele me ditou para o relatório matinal, desliguei o disjuntor geral da ala oeste e peguei o rubi em menos de dois minutos!"',
      breakdown: 'Clara planejou o crime meticulosamente. Ela anotou o código que o Barão a mandou registrar, bebeu um conhaque para conter o nervosismo (deixando a taça com batom) e pulou a janela do jardim na tempestade, rasgando o vestido verde esmeralda na roseira.',
      howEvidenceProvedIt: 'O rascunho com a senha em seu cesto comprovou que ela sabia o código secreto, enquanto a taça com batom e o retalho de cetim verde destruíram seu falso álibi de que estava dormindo no quarto!'
    }
  },
  {
    id: 'caso-2',
    title: 'Veneno no Banquete da Vinícola Imperial',
    codeName: 'CASO #02 - VINHOS ROSSI',
    difficulty: 'Médio',
    estimatedTime: '12-16 min',
    crimeType: 'Homicídio por Envenenamento de Magnata',
    location: 'Vinícola Rossi, Bento Gonçalves - RS',
    timestamp: 'Sábado, 21h30 (Jantar de Gala da Safra Histórica)',
    unlockPointsRequired: 800,
    synopsis: 'Durante o brinde de celebração da safra centenária, o magnata dos vinhos Vincenzo Rossi deu três goles em sua taça especial e desabou fulminado na mesa diante de 20 convidados de honra.',
    detectiveNotes: 'A autópsia preliminar apontou cianeto com aroma amargo de amêndoas. Apenas as taças da mesa principal tiveram acesso restrito antes do banquete. Cinco pessoas tinham acesso aos bastidores.',
    scenes: [
      {
        id: 'scene-salao-jantar',
        name: 'Salão de Banquete Principal',
        description: 'Mesa suntuosa decorada com candelabros de prata e taças de cristal da Boêmia.',
        ambientTone: 'from-rose-950/40 via-slate-900 to-black',
        icon: 'UtensilsCrossed',
        hotspots: [
          {
            id: 'hs-taca-vincenzo',
            title: 'Taça de Vincenzo Rossi',
            x: 50,
            y: 45,
            clueId: 'clue-cianeto-taca',
            inspectionText: 'A taça pessoal de Vincenzo possui resíduos de um pó branco quase imperceptível concentrado no fundo. Teste rápido de reagente dá positivo para cianeto potássico concentrado!',
            hintText: 'Examine o prato e a taça na cabeceira da mesa'
          },
          {
            id: 'hs-guardanapo',
            title: 'Guardanapo de Linho Marcado',
            x: 35,
            y: 68,
            clueId: 'clue-guardanapo-mancha',
            inspectionText: 'Um guardanapo com iniciais bordadas de Vincenzo, amassado com sangue e espuma escura nos lábios.',
            hintText: 'Observe o chão abaixo da cadeira da vítima'
          }
        ]
      },
      {
        id: 'scene-adega',
        name: 'Adega Climatizada Subterrânea',
        description: 'Corredores subterrâneos de pedra com barris de carvalho e garrafas raras com cadeados.',
        ambientTone: 'from-amber-950/30 via-slate-900 to-black',
        icon: 'Wine',
        hotspots: [
          {
            id: 'hs-decantador',
            title: 'Decantador de Cristal Nº 1',
            x: 40,
            y: 52,
            clueId: 'clue-decantador-limpo',
            inspectionText: 'O decantador que abasteceu todas as taças dos convidados está intacto e o vinho dentro é puro! Isso significa que o veneno NÃO estava na garrafa, foi colocado EXCLUSIVAMENTE na taça de Vincenzo!',
            hintText: 'Analise o decantador de prata na mesa de serviço'
          },
          {
            id: 'hs-chave-adega',
            title: 'Registro Eletrônico da Fechadura',
            x: 75,
            y: 35,
            clueId: 'clue-registro-adega',
            inspectionText: 'O leitor biométrico da adega registrou entrada de Dr. Renato Brandão às 20h45 (45 minutos antes do brinde fatal).',
            hintText: 'Verifique o painel de acesso ao lado da porta blindada da adega'
          }
        ]
      },
      {
        id: 'scene-cozinha-gourmet',
        name: 'Cozinha Gourmet do Evento',
        description: 'Bancadas de inox reluzentes com panelas de cobre e temperos importados.',
        ambientTone: 'from-orange-950/30 via-slate-900 to-black',
        icon: 'ChefHat',
        hotspots: [
          {
            id: 'hs-lixeira-cozinha',
            title: 'Lata de Lixo Hospitalar / Descarte',
            x: 60,
            y: 75,
            clueId: 'clue-ampola-veneno',
            inspectionText: 'Dentro de uma luva cirúrgica descartada, você localiza uma ampola de vidro medicinal vazia com o rótulo arrancado e vestígios de reagente para cianeto hospitalar!',
            hintText: 'Reviste a lixeira sob a pia de higienização'
          },
          {
            id: 'hs-prancheta-menu',
            title: 'Organizador de Assentos da Mesa',
            x: 28,
            y: 40,
            clueId: 'clue-mapa-assentos',
            inspectionText: 'O mapa impresso de assentos mostra que a ordem dos convidados foi alterada às pressas no início da noite por solicitação médica de Dr. Renato.',
            hintText: 'Examine a prancheta de protocolo dos garçons'
          }
        ]
      }
    ],
    suspects: [
      {
        id: 'susp-pierre',
        name: 'Chef Pierre Laurent',
        role: 'Mestre Culinário Convidado',
        age: 48,
        gender: 'M',
        avatarBg: 'bg-orange-900/40 border-orange-500',
        avatarIcon: 'ChefHat',
        bio: 'Chef francês renomado contratado com cachê altíssimo para preparar o banquete dos sonhos.',
        alibi: 'Ficou coordenando os fogões e empratamentos na cozinha com 8 auxiliares o tempo todo.',
        initialMotive: 'Vincenzo ameaçou processá-lo por quebra de contrato e arruinar sua carreira culinária.',
        nervousness: 45,
        isCulprit: false,
        questions: [
          {
            id: 'q-pierre-1',
            question: 'Quem teve acesso às taças antes de serem servidas à mesa?',
            answer: 'As taças de cristal saíram da cristaleira e foram para a adega onde o sommelier e os VIPs circulavam. Na minha cozinha apenas a comida e sobremesa foram preparadas!',
            isLie: false
          },
          {
            id: 'q-pierre-2',
            question: 'Você manuseou alguma substância venenosa ou produtos químicos?',
            answer: 'Jamais! Somente extrato de amêndoas doce para o soufflé. Qualquer inspetor de saúde pode atestar meus ingredientes!',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-sofia',
        name: 'Sofia Rossi',
        role: 'Esposa e Herdeira Legal',
        age: 38,
        gender: 'F',
        avatarBg: 'bg-rose-900/40 border-rose-500',
        avatarIcon: 'Gem',
        bio: 'Casada há 10 anos com Vincenzo. Viviam em quartos separados e com advogados preparando termos de separação.',
        alibi: 'Estava sentada conversando com as senhoras da alta sociedade no terraço de entrada.',
        initialMotive: 'Herança avaliada em mais de 80 milhões de reais na vinícola e terras.',
        nervousness: 60,
        isCulprit: false,
        questions: [
          {
            id: 'q-sofia-1',
            question: 'Como estava o casamento de vocês recentemente?',
            answer: 'Não era nenhum segredo que estávamos em crise. Mas eu não precisava matá-lo, o divórcio já me garantiria metade do patrimônio!',
            isLie: false
          },
          {
            id: 'q-sofia-2',
            question: 'Você sabia sobre a alteração do testamento dele?',
            answer: 'Que testamento? Vincenzo mudou o testamento? Eu nunca soube disso!',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-renato',
        name: 'Dr. Renato Brandão',
        role: 'Médico da Família & Sócio de Negócios',
        age: 52,
        gender: 'M',
        avatarBg: 'bg-teal-900/40 border-teal-500',
        avatarIcon: 'Stethoscope',
        bio: 'Médico influente que também administrava uma clínica de luxo financiada por empréstimos de Vincenzo.',
        alibi: 'Diz que chegou atrasado ao banquete devido a um plantão cirúrgico e só entrou no salão às 21h15.',
        initialMotive: 'Vincenzo descobriu que Renato desviou R$ 12 milhões da clínica para cobrir rombos financeiros.',
        nervousness: 90,
        isCulprit: true,
        questions: [
          {
            id: 'q-renato-1',
            question: 'A que horas você realmente chegou à vinícola?',
            answer: 'Cheguei às 21h15, fui direto para a mesa de convidados e sentei com a dona Sofia.',
            isLie: true,
            contradictedByClueId: 'clue-registro-adega',
            revealNotes: 'CONTRADIÇÃO! O leitor biométrico da adega flagrou sua entrada às 20h45!'
          },
          {
            id: 'q-renato-2',
            question: 'Você teve contato com o cianeto usado no crime?',
            answer: 'Sou ortopedista, não trabalho com substâncias toxicológicas hospitalares há mais de vinte anos!',
            isLie: true,
            contradictedByClueId: 'clue-ampola-veneno',
            revealNotes: 'CONTRADIÇÃO! A ampola encontrada na lixeira da cozinha tem lote exclusivo do hospital particular onde Renato opera!'
          },
          {
            id: 'q-renato-3',
            question: 'Por que você pediu para alterar o mapa de assentos?',
            answer: 'Apenas uma questão de cortesia para que os sócios ficassem perto do telão de apresentação.',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-caio',
        name: 'Caio Duarte',
        role: 'Sommelier Chefe',
        age: 34,
        gender: 'M',
        avatarBg: 'bg-purple-900/40 border-purple-500',
        avatarIcon: 'Wine',
        bio: 'Especialista em vinhos premiado internacionalmente. Responsável pela carta de vinhos do evento.',
        alibi: 'Estava na adega preparando as taças e decantando o vinho Rossi Reserva 2015.',
        initialMotive: 'Vincenzo pretendia demiti-lo por suspeita de falsificação de safras.',
        nervousness: 50,
        isCulprit: false,
        questions: [
          {
            id: 'q-caio-1',
            question: 'Você notou alguém estranho na adega durante a decantação?',
            answer: 'O Dr. Renato entrou na adega dizendo que Vincenzo pediu para ele verificar a taça de honra com os sais para a digestão do patrão. Fui obrigado a deixá-lo sozinho por 5 minutos!',
            isLie: false,
            revealNotes: 'Testemunho crucial: Renato manipulou a taça de Vincenzo na adega!'
          }
        ]
      },
      {
        id: 'susp-marcela',
        name: 'Marcela Luz',
        role: 'Jornalista e Crítica Gastronômica',
        age: 39,
        gender: 'F',
        avatarBg: 'bg-pink-900/40 border-pink-500',
        avatarIcon: 'PenTool',
        bio: 'Autora da coluna mais temida da revista Enologia Brasil. Tinha uma relação de amor e ódio com Vincenzo.',
        alibi: 'Estava transmitindo vídeos ao vivo em suas redes sociais durante a recepção.',
        initialMotive: 'Publicar um furo jornalístico bombástico que alavancaria sua carreira.',
        nervousness: 35,
        isCulprit: false,
        questions: [
          {
            id: 'q-marcela-1',
            question: 'Você tinha alguma desavença pessoal com Vincenzo?',
            answer: 'Ele tentou proibir a entrada da minha equipe porque eu sabia de uma auditoria criminal sobre a gestão financeira dos sócios dele.',
            isLie: false
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue-cianeto-taca',
        title: 'Cianeto Concentrado na Taça',
        category: 'Forense',
        description: 'Pó fino de cianeto de potássio na borda interna e fundo da taça exclusiva de Vincenzo.',
        sceneName: 'Salão de Banquete Principal',
        iconName: 'Skull',
        isKeyEvidence: true,
        relevanceNote: 'Comprova que o veneno foi pincelado diretamente na taça da vítima.'
      },
      {
        id: 'clue-guardanapo-mancha',
        title: 'Guardanapo da Vítima com Resíduos',
        category: 'Forense',
        description: 'Guardanapo de linho com sangue coagulado e saliva ácida.',
        sceneName: 'Salão de Banquete Principal',
        iconName: 'File',
        isKeyEvidence: false,
        relevanceNote: 'Atesta a rapidez fulminante do veneno ingerido.'
      },
      {
        id: 'clue-decantador-limpo',
        title: 'Vinho Puro no Decantador Geral',
        category: 'Forense',
        description: 'A garrafa e o decantador servidos a todos os outros 20 convidados não continham veneno.',
        sceneName: 'Adega Climatizada Subterrânea',
        iconName: 'CheckCircle',
        isKeyEvidence: false,
        relevanceNote: 'Exclui o sommelier e a equipe de cozinha de envenenamento em massa.'
      },
      {
        id: 'clue-registro-adega',
        title: 'Registro Biométrico às 20h45',
        category: 'Documento',
        description: 'Log do sistema de segurança comprovando a entrada de Dr. Renato na adega 45min antes do crime.',
        sceneName: 'Adega Climatizada Subterrânea',
        iconName: 'Fingerprint',
        isKeyEvidence: true,
        relevanceNote: 'Desmonta completamente o álibi de Renato sobre ter chegado tarde ao evento.'
      },
      {
        id: 'clue-ampola-veneno',
        title: 'Ampola Cirúrgica na Lixeira',
        category: 'Forense',
        description: 'Ampola medicinal com traços de cianeto do hospital particular de Dr. Renato Brandão.',
        sceneName: 'Cozinha Gourmet do Evento',
        iconName: 'Pill',
        isKeyEvidence: true,
        relevanceNote: 'Arma do crime ligada ao estoque médico controlado do suspeito.'
      },
      {
        id: 'clue-mapa-assentos',
        title: 'Mapa de Assentos Alterado',
        category: 'Documento',
        description: 'Ordem das taças na mesa principal manipulada por recomendação direta de Dr. Renato.',
        sceneName: 'Cozinha Gourmet do Evento',
        iconName: 'LayoutList',
        isKeyEvidence: false,
        relevanceNote: 'Garantia de que a taça envenenada iria exatamente para as mãos de Vincenzo.'
      }
    ],
    culpritId: 'susp-renato',
    keyEvidenceId: 'clue-ampola-veneno',
    trueMotiveId: 'mot-desvio-clinica',
    motiveOptions: [
      { id: 'mot-heranca-divorcio', label: 'Herança da vinícola e partilha de bens com a viúva', isCorrect: false },
      { id: 'mot-desvio-clinica', label: 'Impedir que Vincenzo o denunciasse à polícia pelo desvio de R$ 12 milhões da clínica', isCorrect: true },
      { id: 'mot-critica-jornal', label: 'Silenciar a imprensa para não divulgar vinhos adulterados', isCorrect: false },
      { id: 'mot-disputa-culinaria', label: 'Inveja do sucesso culinário do chef convidado', isCorrect: false }
    ],
    trueMethodId: 'meth-taca-adega',
    methodOptions: [
      { id: 'meth-garrafa-geral', label: 'Colocou veneno no barril principal da vinícola', isCorrect: false },
      { id: 'meth-taca-adega', label: 'Entrou na adega às 20h45 e pincelou cianeto cirúrgico exclusivamente na taça da vítima', isCorrect: true },
      { id: 'meth-sobremesa-chef', label: 'Injetou cianeto no creme de baunilha da sobremesa', isCorrect: false }
    ],
    solutionSummary: {
      confession: '"Vincenzo me chamou no escritório antes do jantar com as planilhas da auditoria. Ele me deu 24 horas para devolver R$ 12 milhões ou chamaria a Polícia Federal! Minha carreira, meu nome e minha liberdade seriam destruídos para sempre! Eu trouxe a ampola de cianeto do bloco cirúrgico, fui à adega enquanto o sommelier conferia os barris e preparei a taça dele!"',
      breakdown: 'Dr. Renato planejou um ataque cirúrgico: ao invés de contaminar o vinho compartilhado, ele envenenou somente a taça reservada na adega e se certificou de que a disposição da mesa a entregaria diretamente à vítima.',
      howEvidenceProvedIt: 'O registro biométrico na adega às 20h45 destruiu seu álibi temporal, e a ampola com lote de sua própria clínica encontrada na lixeira comprovou a posse do veneno fatal.'
    }
  },
  {
    id: 'caso-3',
    title: 'O Enigma do Museu das Sombras',
    codeName: 'CASO #03 - MUSEU HISTÓRICO',
    difficulty: 'Difícil',
    estimatedTime: '15-20 min',
    crimeType: 'Roubo de Relíquia Sagrada & Sabotagem',
    location: 'Museu Imperial de Belas Artes, Ouro Preto - MG',
    timestamp: 'Sexta-feira, 23h45 (Madrugada de Lua Nova)',
    unlockPointsRequired: 1800,
    synopsis: 'O antiquíssimo Manuscrito Dourado do Século XVI, protegido por vidro temperado e sensores laser na Sala das Relíquias, foi roubado. O alarme disparou, mas as câmeras congelaram num loop de 7 minutos gravado previamente.',
    detectiveNotes: 'O vidro do expositor foi cortado com lâmina de diamante e o lacre químico foi dissolvido com solvente especializado. Cinco especialistas em restauração e segurança estavam autorizados no prédio.',
    scenes: [
      {
        id: 'scene-sala-reliquias',
        name: 'Galeria das Relíquias Proibidas',
        description: 'Sala com iluminação indireta especial e vitrines de acrílico balístico.',
        ambientTone: 'from-amber-950/40 via-stone-900 to-black',
        icon: 'Crown',
        hotspots: [
          {
            id: 'hs-vitrine-cortada',
            title: 'Expositor Central Violado',
            x: 52,
            y: 45,
            clueId: 'clue-bisturi-ouro',
            inspectionText: 'O vidro do expositor tem um corte circular milimétrico. No chão, você encontra uma ponta de bisturi de restauração com restos de tinta folheada a ouro do manuscrito!',
            hintText: 'Olhe a redoma central de vidro partida'
          },
          {
            id: 'hs-pano-solvente',
            title: 'Pano de Microfibra Especial',
            x: 30,
            y: 72,
            clueId: 'clue-pano-solvente',
            inspectionText: 'Um pano de microfibra com cheiro penetrante de Solvente K-42, uma mistura química patenteada desenvolvida exclusivamente pelo restaurador Viktor Cruz!',
            hintText: 'Inspecione o rodapé atrás da coluna de mármore'
          }
        ]
      },
      {
        id: 'scene-sala-seguranca',
        name: 'Central de Câmeras & Monitoramento',
        description: 'Painéis com 16 monitores CRT e gravadores de fita e servidores digitais.',
        ambientTone: 'from-blue-950/40 via-slate-900 to-black',
        icon: 'Shield',
        hotspots: [
          {
            id: 'hs-pendrive-sabotagem',
            title: 'Porta USB Traseira do Servidor',
            x: 45,
            y: 40,
            clueId: 'clue-pendrive-loop',
            inspectionText: 'Plugado na parte de trás da central de gravação há um mini pen drive preto com um script configurado para transmitir 7 minutos de corredor vazio em looping contínuo!',
            hintText: 'Reviste a traseira do rack principal de servidores'
          },
          {
            id: 'hs-cafe-vigilante',
            title: 'Garrafa Térmica da Guarda',
            x: 70,
            y: 65,
            clueId: 'clue-cafe-sedativo',
            inspectionText: 'O café da guarda-noturna Bianca contém vestígios de gotas de sonífero comum, explicando por que ela cochilou exatamente às 23h30.',
            hintText: 'Analise a caneca de café sobre a mesa de monitoramento'
          }
        ]
      },
      {
        id: 'scene-oficina-restauro',
        name: 'Oficina de Restauração Química',
        description: 'Bancadas de restauração com lupas industriais, solventes, pinças e microscópios.',
        ambientTone: 'from-emerald-950/30 via-slate-900 to-black',
        icon: 'Sparkles',
        hotspots: [
          {
            id: 'hs-estojo-bisturis',
            title: 'Estojo de Ferramentas de Precisão',
            x: 55,
            y: 48,
            clueId: 'clue-estojo-incompleto',
            inspectionText: 'No estojo gravado com o nome "V. Cruz", falta exatamente o bisturi nº 3 de ponta diamantada, do mesmo calibre da ponta quebrada na vitrine do museu!',
            hintText: 'Abra o estojo de couro sobre a bancada'
          },
          {
            id: 'hs-comprovante-suica',
            title: 'Recibo sob o Teclado',
            x: 32,
            y: 60,
            clueId: 'clue-deposito-suico',
            inspectionText: 'Um comprovante de transferência bancária internacional cifrada confirmando entrada de 500.000 francos suíços com o memo: "Entrega do Manuscrito Dourado".',
            hintText: 'Levante o bloco de notas da bancada'
          }
        ]
      }
    ],
    suspects: [
      {
        id: 'susp-dante',
        name: 'Prof. Dante Alencar',
        role: 'Historiador & Curador-Geral',
        age: 59,
        gender: 'M',
        avatarBg: 'bg-amber-900/40 border-amber-500',
        avatarIcon: 'GraduationCap',
        bio: 'Dedicou a vida ao estudo do Manuscrito Dourado. Considera a obra o ápice da arte sacra brasileira.',
        alibi: 'Estava em sua residência catalogando fichas bibliográficas até receber o telefonema da segurança.',
        initialMotive: 'Fanatismo pelo manuscrito; desejava impedir que fosse vendido a colecionadores estrangeiros.',
        nervousness: 40,
        isCulprit: false,
        questions: [
          {
            id: 'q-dante-1',
            question: 'Quem conhecia a composição química do lacre da vitrine?',
            answer: 'Apenas eu e o restaurador Viktor Cruz. O solvente precisa ser neutralizado com fórmula exata, senão o papiro desintegra ao toque do ar.',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-bianca',
        name: 'Bianca Viana',
        role: 'Chefe de Segurança da Noite',
        age: 36,
        gender: 'F',
        avatarBg: 'bg-blue-900/40 border-blue-500',
        avatarIcon: 'ShieldAlert',
        bio: 'Ex-policial militar com ficha impecável. Trabalha na segurança do museu há 4 anos.',
        alibi: 'Alega que sentiu uma sonolência súbita e desmaiou na cadeira da central por cerca de 20 minutos.',
        initialMotive: 'Poderia ter sido subornada para facilitar a invasão da galeria.',
        nervousness: 65,
        isCulprit: false,
        questions: [
          {
            id: 'q-bianca-1',
            question: 'Alguém esteve na sala de segurança com você antes de você apagar?',
            answer: 'O restaurador Viktor me trouxe um copo de água e uma fatia de bolo às 23h15 dizendo que eu parecia cansada. Depois disso minha vista escureceu.',
            isLie: false,
            revealNotes: 'Viktor dopou a guarda para instalar o pen drive de sabotagem!'
          }
        ]
      },
      {
        id: 'susp-viktor',
        name: 'Viktor Cruz',
        role: 'Mestre Restaurador de Artefatos',
        age: 44,
        gender: 'M',
        avatarBg: 'bg-emerald-900/40 border-emerald-500',
        avatarIcon: 'Wrench',
        bio: 'Talentoso restaurador com passagem por ateliês em Florença. Conhece todas as técnicas de conservação e cortes.',
        alibi: 'Afirma que trancou sua oficina às 20h e foi jantar em um bistrô no centro histórico.',
        initialMotive: 'Enorme dívida tributária e uma proposta milionária de um colecionador suíço clandestino.',
        nervousness: 85,
        isCulprit: true,
        questions: [
          {
            id: 'q-viktor-1',
            question: 'Onde estão suas ferramentas de corte com ponta de diamante?',
            answer: 'Estão todas trancadas e intocadas no meu estojo na bancada!',
            isLie: true,
            contradictedByClueId: 'clue-estojo-incompleto',
            revealNotes: 'CONTRADIÇÃO! O bisturi nº 3 diamantado está faltando no estojo, e a lâmina foi achada na vitrine arrombada!'
          },
          {
            id: 'q-viktor-2',
            question: 'Quem além de você tem acesso ao seu Solvente patenteado K-42?',
            answer: 'Ninguém! A fórmula é meu maior segredo profissional, não compartilho com ser humano algum.',
            isLie: false,
            revealNotes: 'Admissão vital: Se o pano com Solvente K-42 estava no chão do crime, somente Viktor poderia estar usando!'
          },
          {
            id: 'q-viktor-3',
            question: 'Você teve contato com contas bancárias na Suíça?',
            answer: 'Nunca abri uma conta no exterior na minha vida!',
            isLie: true,
            contradictedByClueId: 'clue-deposito-suico',
            revealNotes: 'CONTRADIÇÃO! O comprovante de 500.000 francos suíços sob o teclado prova a negociação do roubo!'
          }
        ]
      },
      {
        id: 'susp-leticia',
        name: 'Letícia Prado',
        role: 'Pesquisadora Associada',
        age: 31,
        gender: 'F',
        avatarBg: 'bg-purple-900/40 border-purple-500',
        avatarIcon: 'Book',
        bio: 'Doutoranda que realiza inventário digital dos itens sacros do século XVI.',
        alibi: 'Estava na biblioteca pública da cidade até as 22h e depois foi para casa.',
        initialMotive: 'Acesso facilitado e prestígio ao "descobrir" o paradeiro da obra roubada.',
        nervousness: 25,
        isCulprit: false,
        questions: [
          {
            id: 'q-leticia-1',
            question: 'Você viu Viktor trabalhando após as 20h?',
            answer: 'Sim! Às 22h45 vi a luz da oficina dele acesa e o som de uma lixadeira de precisão funcionando.',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-otavio',
        name: 'Otávio Ramos',
        role: 'Bilionário Patrocinador do Museu',
        age: 62,
        gender: 'M',
        avatarBg: 'bg-yellow-900/40 border-yellow-500',
        avatarIcon: 'Banknote',
        bio: 'Doou milhões ao museu, mas enfrenta processos judiciais e auditoria de lavagem de dinheiro.',
        alibi: 'Estava em viagem para o Rio de Janeiro com bilhetes aéreos comprovados.',
        initialMotive: 'Recuperar o valor investido nas doações vendendo relíquias fora do país.',
        nervousness: 20,
        isCulprit: false,
        questions: [
          {
            id: 'q-otavio-1',
            question: 'O senhor pretendia retirar o apoio ao acervo do manuscrito?',
            answer: 'Minha doação foi irrevogável. Prefiro que a história fique onde pertence: aos olhos de todo o povo.',
            isLie: false
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue-bisturi-ouro',
        title: 'Ponta de Bisturi com Ouro do Manuscrito',
        category: 'Forense',
        description: 'Lâmina de bisturi diamantada partida contendo pigmentos dourados da tinta do século XVI.',
        sceneName: 'Galeria das Relíquias Proibidas',
        iconName: 'Scissors',
        isKeyEvidence: true,
        relevanceNote: 'Instrumento cirúrgico utilizado para cortar o lacre balístico.'
      },
      {
        id: 'clue-pano-solvente',
        title: 'Pano com Solvente K-42 Patenteado',
        category: 'Forense',
        description: 'Microfibra impregnada com o solvente de fórmula exclusiva de Viktor Cruz.',
        sceneName: 'Galeria das Relíquias Proibidas',
        iconName: 'Droplet',
        isKeyEvidence: true,
        relevanceNote: 'Invalida qualquer dúvida sobre quem operou a abertura química do vidro.'
      },
      {
        id: 'clue-pendrive-loop',
        title: 'Pen Drive com Loop de 7 Minutos',
        category: 'Documento',
        description: 'Dispositivo USB plugado na central de câmeras para mascarar a ação com vídeo gravado.',
        sceneName: 'Central de Câmeras & Monitoramento',
        iconName: 'HardDrive',
        isKeyEvidence: false,
        relevanceNote: 'Explica por que o alarme sonoro tocou sem que as câmeras mostrassem ninguém.'
      },
      {
        id: 'clue-cafe-sedativo',
        title: 'Caneca da Guarda com Sonífero',
        category: 'Forense',
        description: 'Gotas de sedativo misturadas ao café da guarda Bianca para deixá-la inconsciente.',
        sceneName: 'Central de Câmeras & Monitoramento',
        iconName: 'Coffee',
        isKeyEvidence: false,
        relevanceNote: 'Comprova que a guarda foi vítima de sabotagem interna premeditada.'
      },
      {
        id: 'clue-estojo-incompleto',
        title: 'Estojo de Viktor com Lâmina Faltante',
        category: 'Objeto Pessoal',
        description: 'Estojo particular do restaurador onde falta a lâmina nº 3 idêntica à ponta quebrada.',
        sceneName: 'Oficina de Restauração Química',
        iconName: 'Archive',
        isKeyEvidence: true,
        relevanceNote: 'Ligação material direta da ferramenta do crime à propriedade de Viktor.'
      },
      {
        id: 'clue-deposito-suico',
        title: 'Comprovante Bancário Suíço',
        category: 'Documento',
        description: 'Transferência de 500.000 francos suíços para a conta de Viktor Cruz com memo do manuscrito.',
        sceneName: 'Oficina de Restauração Química',
        iconName: 'CreditCard',
        isKeyEvidence: true,
        relevanceNote: 'O motivo financeiro incontestável para o roubo.'
      }
    ],
    culpritId: 'susp-viktor',
    keyEvidenceId: 'clue-pano-solvente',
    trueMotiveId: 'mot-contrabando-suico',
    motiveOptions: [
      { id: 'mot-fanatismo-religioso', label: 'Destruir a relíquia por considerar arte profana', isCorrect: false },
      { id: 'mot-contrabando-suico', label: 'Vender a relíquia a um comprador suíço clandestino por 500.000 francos para pagar dívidas', isCorrect: true },
      { id: 'mot-chantagem-guarda', label: 'Fazer chantagem contra a empresa privada de segurança', isCorrect: false }
    ],
    trueMethodId: 'meth-dopagem-solvente',
    methodOptions: [
      { id: 'meth-explosao-teto', label: 'Desceu de rapel pelo teto e usou maçarico no cofre', isCorrect: false },
      { id: 'meth-dopagem-solvente', label: 'Dopou a guarda, inseriu pen drive na central de câmeras e dissolveu o lacre com seu solvente K-42 exclusivo', isCorrect: true },
      { id: 'meth-suborno-diretor', label: 'Comprou uma réplica falsa em Florença e fez a troca na calada do dia', isCorrect: false }
    ],
    solutionSummary: {
      confession: '"Eu passei anos restaurando patrimônios milionários enquanto o Estado me pagava migalhas! Quando o comprador de Genebra ofereceu meio milhão de francos, vi minha única chance de me aposentar dignamente. Dopei a guarda com calmante no café, ativei o script de câmeras e usei meu bisturi e solvente para retirar o manuscrito em 4 minutos!"',
      breakdown: 'Viktor planejou a operação como um restaurador: sabia exatamente onde aplicar o solvente K-42 para não arruinar o papiro e usou um loop gravado nas câmeras para criar uma janela fantasma de fuga.',
      howEvidenceProvedIt: 'O Solvente K-42 é de fórmula exclusiva e intransferível de Viktor, e a ponta quebrada do bisturi casou com precisão microscópica com o seu estojo pessoal!'
    }
  },
  {
    id: 'caso-4',
    title: 'O Expresso da Meia-Noite nos Alpes',
    codeName: 'CASO #04 - TREM TRANSEUROPA',
    difficulty: 'Mestre',
    estimatedTime: '18-25 min',
    crimeType: 'Espionagem de Estado & Atentado Diplomático',
    location: 'Expresso Transalpino, Travessia Suíça-Áustria',
    timestamp: 'Domingo, 01h15 (Trem retido por avalanche na neve)',
    unlockPointsRequired: 3200,
    synopsis: 'Com o trem retido no desfiladeiro nevado, o diplomata diplomata internacional Nikolai Voronov é encontrado desacordado em sua cabine de luxo. Sua maleta blindada com os tratados de desarmamento militar foi roubada.',
    detectiveNotes: 'A fechadura da cabine foi aberta por dentro ou com gazua profissional. Há 6 passageiros de interesse no vagão de primeira classe. Um deles é um agente clandestino com documentos falsos.',
    scenes: [
      {
        id: 'scene-cabine-7',
        name: 'Cabine Presidencial Nº 7',
        description: 'Cabine estofada em veludo carmesim. Papéis espalhados e um aroma floral penetrante no ar.',
        ambientTone: 'from-red-950/40 via-slate-900 to-black',
        icon: 'Lock',
        hotspots: [
          {
            id: 'hs-relogio-quebrado',
            title: 'Relógio de Bolso no Chão',
            x: 42,
            y: 70,
            clueId: 'clue-relogio-parado',
            inspectionText: 'Relógio de ouro do diplomata com o vidro quebrado pelo impacto da luta. Os ponteiros mecânicos travaram exatamente às 01h15 da madrugada!',
            hintText: 'Observe o chão ao lado da cabeceira da cama'
          },
          {
            id: 'hs-caneta-sedativo',
            title: 'Caneta-Tinteiro sob a Poltrona',
            x: 65,
            y: 52,
            clueId: 'clue-caneta-seringa',
            inspectionText: 'Uma elegante caneta-tinteiro que esconde uma microagulha e reservatório de sonífero potente. No clip dourado estão gravadas as iniciais "K.W."!',
            hintText: 'Verifique embaixo do assento estofado'
          },
          {
            id: 'hs-lenço-perfume',
            title: 'Lenço de Seda no Travesseiro',
            x: 25,
            y: 42,
            clueId: 'clue-lenco-perfume',
            inspectionText: 'Lenço de seda com aroma floral raro de Orquídeas Negras, o mesmo perfume exclusivo encomendado em Paris pela Condessa Veronika.',
            hintText: 'Inspecione a ponta do travesseiro desarrumado'
          }
        ]
      },
      {
        id: 'scene-vagao-restaurante',
        name: 'Vagão-Restaurante Imperial',
        description: 'Mesas com toalhas brancas de linho e bar com piano de cauda.',
        ambientTone: 'from-amber-950/30 via-slate-900 to-black',
        icon: 'Coffee',
        hotspots: [
          {
            id: 'hs-corda-piano',
            title: 'Piano de Cauda com Corda Rompida',
            x: 35,
            y: 45,
            clueId: 'clue-fio-aco',
            inspectionText: 'Uma das cordas de aço de alta resistência do piano foi cortada com alicate profissional. O mesmo tipo de fio de garrote utilizado por espiões militares!',
            hintText: 'Olhe a tampa aberta do piano de cauda'
          },
          {
            id: 'hs-cinzeiro-bar',
            title: 'Cinzeiro de Cristal no Balcão',
            x: 72,
            y: 55,
            clueId: 'clue-telegrama-queimado',
            inspectionText: 'Cinzas de um telegrama militar em código morse internacional. Consegue-se ler a frase final: "... interceptar Voronov antes de Viena."',
            hintText: 'Reviste os restos de cinzas no balcão de mogno'
          }
        ]
      },
      {
        id: 'scene-furgão-bagagens',
        name: 'Furgão de Bagagens & Máquinas',
        description: 'Vagão gélido cheio de baús de viagem e acesso à caldeira da locomotiva.',
        ambientTone: 'from-slate-950 via-zinc-900 to-black',
        icon: 'Luggage',
        hotspots: [
          {
            id: 'hs-mala-fundo-falso',
            title: 'Baú com Fundo Falso Aberto',
            x: 48,
            y: 60,
            clueId: 'clue-passaporte-falso',
            inspectionText: 'Dentro do fundo falso do baú do passageiro Boris Morozov, você encontra um passaporte diplomático russo com outro nome e o distintivo da inteligência militar secreta!',
            hintText: 'Puxe o revestimento duplo do baú de couro marrom'
          },
          {
            id: 'hs-maleta-diplomata',
            title: 'Maleta Diplomática Oculta no Carvão',
            x: 75,
            y: 75,
            clueId: 'clue-maleta-arrombada',
            inspectionText: 'A maleta blindada de Nikolai Voronov, forçada com alavanca de engenharia e vazia! Os documentos secretos foram removidos!',
            hintText: 'Verifique atrás da pilha de carvão da fornalha'
          }
        ]
      }
    ],
    suspects: [
      {
        id: 'susp-veronika',
        name: 'Condessa Veronika',
        role: 'Aristocrata Austríaca',
        age: 42,
        gender: 'F',
        avatarBg: 'bg-rose-900/40 border-rose-500',
        avatarIcon: 'Crown',
        bio: 'Dama da alta sociedade europeia com laços com a corte e salões políticos de Viena.',
        alibi: 'Afirma que não saiu de sua cabine particular número 4 devido a um ataque de enxaqueca.',
        initialMotive: 'Influência política e impedir os acordos de desarmamento que afetariam suas indústrias bélicas.',
        nervousness: 55,
        isCulprit: false,
        questions: [
          {
            id: 'q-veronika-1',
            question: 'Por que o seu perfume característico estava no travesseiro do diplomata?',
            answer: 'Nikolai e eu fomos amantes no passado! Estive na cabine dele às 20h para conversar sobre lembranças, mas saí muito antes da meia-noite!',
            isLie: false,
            revealNotes: 'Explica o perfume, mas seu álibi é sustentado pelo comissário que a viu voltar às 20h30.'
          }
        ]
      },
      {
        id: 'susp-klaus',
        name: 'Dr. Klaus Weber',
        role: 'Médico de Viagem',
        age: 50,
        gender: 'M',
        avatarBg: 'bg-teal-900/40 border-teal-500',
        avatarIcon: 'Stethoscope',
        bio: 'Médico austríaco contratado pela ferrovia para emergências a bordo.',
        alibi: 'Estava na cabine médica descansando até ser chamado para socorrer Voronov.',
        initialMotive: 'Subornado para aplicar sedativo no diplomata.',
        nervousness: 80,
        isCulprit: false,
        questions: [
          {
            id: 'q-klaus-1',
            question: 'A caneta-tinteiro com sedativo tem as suas iniciais KW?',
            answer: 'Sim, é minha caneta! Ela foi furtada do meu jaleco por volta das 23h enquanto eu tomava conhaque com Boris no restaurante!',
            isLie: false,
            revealNotes: 'Boris usou a aproximação com o médico para furtar a arma de sedação!'
          }
        ]
      },
      {
        id: 'susp-boris',
        name: 'Boris Morozov (Falso Inspetor)',
        role: 'Agente Secreto Infiltrado',
        age: 39,
        gender: 'M',
        avatarBg: 'bg-red-950 border-red-600',
        avatarIcon: 'Shield',
        bio: 'Apresentou-se como inspetor de segurança ferroviária em trânsito de férias.',
        alibi: 'Alega que patrulhava os corredores externos do trem checando as janelas contra a tempestade.',
        initialMotive: 'Roubar os planos militares secretos para vendê-los a uma potência rival.',
        nervousness: 92,
        isCulprit: true,
        questions: [
          {
            id: 'q-boris-1',
            question: 'Você confirma que é apenas um inspetor de folga da ferrovia?',
            answer: 'Com certeza, aqui estão minhas credenciais emitidas pelo governo austríaco!',
            isLie: true,
            contradictedByClueId: 'clue-passaporte-falso',
            revealNotes: 'CONTRADIÇÃO! O baú com fundo falso continha passaporte falso e distintivo da espionagem militar internacional!'
          },
          {
            id: 'q-boris-2',
            question: 'Onde você estava exatamente à 01h15 quando o relógio de Voronov quebrou?',
            answer: 'Eu estava no vagão restaurante conversando com a cantora Camille!',
            isLie: true,
            contradictedByClueId: 'clue-telegrama-queimado',
            revealNotes: 'CONTRADIÇÃO! Camille nega e o telegrama de espionagem interceptado foi queimado no cinzeiro do bar minutos antes da invasão!'
          },
          {
            id: 'q-boris-3',
            question: 'Como a maleta do diplomata foi parar no vagão de bagagens?',
            answer: 'Qualquer passageiro tem acesso livre ao furgão de cargas durante a noite!',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-camille',
        name: 'Camille Dubois',
        role: 'Cantora e Artista de Cabaré',
        age: 29,
        gender: 'F',
        avatarBg: 'bg-purple-900/40 border-purple-500',
        avatarIcon: 'Music',
        bio: 'Viajando em turnê pelas capitais europeias. Costuma atrair a atenção de diplomatas e nobres.',
        alibi: 'Ficou tocando piano no vagão restaurante até a meia-noite e depois dormiu.',
        initialMotive: 'Poderia estar agindo como intermediária de informações.',
        nervousness: 45,
        isCulprit: false,
        questions: [
          {
            id: 'q-camille-1',
            question: 'Boris esteve com você à 01h15 como ele alega?',
            answer: 'Mentira deslavada! À meia-noite o salão fechou e eu me retirei. À 01h15 vi Boris andando apressado pelo corredor segurando uma maleta de couro preto!',
            isLie: false,
            revealNotes: 'Testemunho ocular: Boris carregava a maleta na hora do crime!'
          }
        ]
      },
      {
        id: 'susp-james',
        name: 'James Sterling',
        role: 'Engenheiro Britânico de Locomotiva',
        age: 47,
        gender: 'M',
        avatarBg: 'bg-amber-900/40 border-amber-500',
        avatarIcon: 'Wrench',
        bio: 'Especialista em ferrovias de alta altitude, contratado para supervisionar a rota nos Alpes.',
        alibi: 'Estava na cabine de máquinas tentando desengatar a trava congelada dos trilhos.',
        initialMotive: 'Sabotagem industrial da ferrovia concorrente.',
        nervousness: 30,
        isCulprit: false,
        questions: [
          {
            id: 'q-james-1',
            question: 'Você notou movimentação no furgão de carvão?',
            answer: 'Ouvi passos pesados de botas militares por volta da 01h20 e vi alguém arremessando um objeto metálico pesado contra o depósito de carvão.',
            isLie: false
          }
        ]
      },
      {
        id: 'susp-andre',
        name: 'André Lima',
        role: 'Comissário Chefe de Bordo',
        age: 33,
        gender: 'M',
        avatarBg: 'bg-slate-800 border-slate-600',
        avatarIcon: 'Bell',
        bio: 'Brasileiro residente na Europa, cuida do atendimento aos passageiros da primeira classe.',
        alibi: 'Fazia a checagem das fechaduras das cabines e servia café aos passageiros insones.',
        initialMotive: 'Acesso a todas as chaves e códigos das cabines.',
        nervousness: 25,
        isCulprit: false,
        questions: [
          {
            id: 'q-andre-1',
            question: 'A porta da cabine 7 estava arrombada?',
            answer: 'Não! Foi aberta com chave-mestra ou alguém foi convidado a entrar. Voronov abriu a porta pensando se tratar do serviço de bordo ou de um colega.',
            isLie: false
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue-relogio-parado',
        title: 'Relógio Quebrado às 01h15',
        category: 'Forense',
        description: 'Ponteiros do relógio do diplomata parados no exato minuto em que a luta corporal ocorreu.',
        sceneName: 'Cabine Presidencial Nº 7',
        iconName: 'Clock',
        isKeyEvidence: true,
        relevanceNote: 'Fixa a hora exata do crime e desmonta qualquer álibi desse horário.'
      },
      {
        id: 'clue-caneta-seringa',
        title: 'Caneta Médica com Sedativo',
        category: 'Objeto Pessoal',
        description: 'Caneta furtada do Dr. Klaus adaptada com agulha para sedar Voronov instantaneamente.',
        sceneName: 'Cabine Presidencial Nº 7',
        iconName: 'PenTool',
        isKeyEvidence: false,
        relevanceNote: 'Arma utilizada para apagar a vítima sem barulho de tiros.'
      },
      {
        id: 'clue-lenco-perfume',
        title: 'Lenço com Orquídeas Negras',
        category: 'Objeto Pessoal',
        description: 'Lenço de seda com perfume da Condessa deixado durante a conversa do início da noite.',
        sceneName: 'Cabine Presidencial Nº 7',
        iconName: 'Feather',
        isKeyEvidence: false,
        relevanceNote: 'Pista falsa: colocado horas antes do ataque durante uma conversa cordial.'
      },
      {
        id: 'clue-fio-aco',
        title: 'Corda Rompida do Piano',
        category: 'Forense',
        description: 'Fio de piano de aço cortado utilizado como instrumento de imobilização militar.',
        sceneName: 'Vagão-Restaurante Imperial',
        iconName: 'Activity',
        isKeyEvidence: false,
        relevanceNote: 'Técnica característica de operações de forças especiais.'
      },
      {
        id: 'clue-telegrama-queimado',
        title: 'Telegrama Cifrado de Espionagem',
        category: 'Documento',
        description: 'Cinzas de ordem militar em código instruindo a interceptação dos documentos de Voronov.',
        sceneName: 'Vagão-Restaurante Imperial',
        iconName: 'Flame',
        isKeyEvidence: true,
        relevanceNote: 'Prova da premeditação e da missão de espionagem estrangeira.'
      },
      {
        id: 'clue-passaporte-falso',
        title: 'Passaporte Falso e Distintivo Secreto',
        category: 'Documento',
        description: 'Identidade falsa e credencial de espião estrangeiro ocultas no baú com fundo falso de Boris.',
        sceneName: 'Furgão de Bagagens & Máquinas',
        iconName: 'ShieldAlert',
        isKeyEvidence: true,
        relevanceNote: 'Desmascara a verdadeira identidade de Boris e seu disfarce de inspetor comum.'
      },
      {
        id: 'clue-maleta-arrombada',
        title: 'Maleta Diplomática Violada',
        category: 'Objeto Pessoal',
        description: 'A maleta de Nikolai esvaziada dos tratados militares e jogada no carvão.',
        sceneName: 'Furgão de Bagagens & Máquinas',
        iconName: 'Briefcase',
        isKeyEvidence: true,
        relevanceNote: 'Comprova onde o produto do roubo foi violado e ocultado.'
      }
    ],
    culpritId: 'susp-boris',
    keyEvidenceId: 'clue-passaporte-falso',
    trueMotiveId: 'mot-espionagem-militar',
    motiveOptions: [
      { id: 'mot-ciumes-condessa', label: 'Crime passional por ciúmes da Condessa Veronika', isCorrect: false },
      { id: 'mot-espionagem-militar', label: 'Espionagem militar de estado para roubar tratados confidenciais de defesa', isCorrect: true },
      { id: 'mot-chantagem-ferrovia', label: 'Exigir resgate milionário da empresa ferroviária nos Alpes', isCorrect: false }
    ],
    trueMethodId: 'meth-furtou-caneta-invadiu',
    methodOptions: [
      { id: 'meth-bomba-trilhos', label: 'Plantou dinamite nos trilhos e atacou durante a explosão', isCorrect: false },
      { id: 'meth-furtou-caneta-invadiu', label: 'Furtou a caneta sedativa do médico, bateu na cabine como inspetor, apagou Voronov à 01h15 e escondeu a maleta no furgão', isCorrect: true },
      { id: 'meth-conluio-condessa', label: 'A Condessa envenenou o champanhe e jogou a maleta pela janela na neve', isCorrect: false }
    ],
    solutionSummary: {
      confession: '"Voronov estava prestes a entregar os planos de desarmamento em Genebra. Meus superiores não poderiam permitir isso. Furtar o sedativo daquele médico ingênuo foi brincadeira de criança. Nikolai confiou no meu uniforme de inspetor e abriu a porta. Ele ainda tentou lutar, quebrando seu relógio de ouro, mas o sedativo agiu em três segundos. Eu escondi os microfilmes no forro do meu casaco e atirei a carcaça da maleta no carvão!"',
      breakdown: 'Boris Morozov é um agente infiltrado de alto escalão. Ele aproveitou o atraso da tempestade para agir na hora morta da madrugada (01h15), usando a autoridade de seu falso uniforme para fazer a vítima abrir a cabine trancada.',
      howEvidenceProvedIt: 'O passaporte falso no fundo do baú comprovou sua atividade de espionagem clandestina, enquanto o relógio quebrado e o depoimento de Camille destruíram seu falso álibi!'
    }
  }
];

export const DETECTIVE_RANKS = [
  { minScore: 0, title: 'Detetive Aprendiz', badge: 'Novato', desc: 'Dando os primeiros passos nas investigações forenses.' },
  { minScore: 800, title: 'Investigador Forense', badge: 'Perito', desc: 'Capaz de notar contradições sutis em depoimentos.' },
  { minScore: 2000, title: 'Inspetor Chefe', badge: 'Inspetor', desc: 'Raciocínio lógico aguçado e dedução implacável.' },
  { minScore: 3500, title: 'Mestre da Dedução (Sherlock)', badge: 'Lenda', desc: 'Nenhum criminoso escapa de suas conclusões!' }
];
