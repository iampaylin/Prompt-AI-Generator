/**
 * DATA CONFIGURATION FILE (V9)
 * Changes: Values Sanitized for High Safety. "Látex" -> "Vinil", "Micro Saia" -> "Mini Saia".
 */

// 1. COLORS
export const COLOR_GROUPS = [
    {
        id: 'basics',
        label: 'Básicos',
        colors: [
            { id: "black", label: "Preto", value: "preto", hex: "#000000" },
            { id: "white", label: "Branco", value: "branco", hex: "#FFFFFF" },
            { id: "grey", label: "Cinza", value: "cinza", hex: "#808080" },
            { id: "charcoal", label: "Chumbo", value: "chumbo", hex: "#36454F" },
            { id: "nude", label: "Nude", value: "nude", hex: "#E3BC9A" },
            { id: "beige", label: "Bege", value: "bege", hex: "#F5F5DC" },
            { id: "brown", label: "Marrom", value: "marrom", hex: "#8B4513" },
        ]
    },
    {
        id: 'vibrant',
        label: 'Vibrantes',
        colors: [
            { id: "red", label: "Vermelho", value: "vermelho", hex: "#FF0000" },
            { id: "royal", label: "Azul Royal", value: "azul royal", hex: "#4169E1" },
            { id: "emerald", label: "Esmeralda", value: "verde esmeralda", hex: "#50C878" },
            { id: "orange", label: "Laranja", value: "laranja", hex: "#FFA500" },
            { id: "purple", label: "Roxo", value: "roxo", hex: "#800080" },
            { id: "yellow", label: "Amarelo", value: "amarelo", hex: "#FFFF00" },
            { id: "magenta", label: "Magenta", value: "magenta", hex: "#FF00FF" },
            { id: "cyan", label: "Ciano", value: "ciano", hex: "#00FFFF" },
        ]
    },
    {
        id: 'pastel',
        label: 'Pastel / Suave',
        colors: [
            { id: "baby_pink", label: "Rosa Bebê", value: "rosa bebê", hex: "#F4C2C2" },
            { id: "baby_blue", label: "Azul Bebê", value: "azul bebê", hex: "#89CFF0" },
            { id: "mint", label: "Menta", value: "verde menta", hex: "#98FF98" },
            { id: "lavender", label: "Lavanda", value: "lavanda", hex: "#E6E6FA" },
            { id: "cream", label: "Creme", value: "creme", hex: "#FFFDD0" },
            { id: "peach", label: "Pêssego", value: "pêssego", hex: "#FFE5B4" },
        ]
    },
    {
        id: 'neon',
        label: 'Neons',
        colors: [
            { id: "neon_green", label: "Neon Green", value: "verde neon", hex: "#39FF14" },
            { id: "neon_pink", label: "Neon Pink", value: "rosa neon", hex: "#FF10F0" },
            { id: "neon_orange", label: "Neon Orange", value: "laranja neon", hex: "#FF5F1F" },
            { id: "electric_blue", label: "Elétrico", value: "azul elétrico", hex: "#7DF9FF" },
        ]
    },
    {
        id: 'metallic',
        label: 'Metálicos',
        colors: [
            { id: "gold", label: "Dourado", value: "dourado", hex: "#FFD700" },
            { id: "silver", label: "Prata", value: "prateado", hex: "#C0C0C0" },
            { id: "rose_gold", label: "Rose Gold", value: "rose gold", hex: "#B76E79" },
            { id: "bronze", label: "Bronze", value: "bronze", hex: "#CD7F32" },
        ]
    }
];

export const COLORS = COLOR_GROUPS.flatMap(g => g.colors);

// 2. CLOTHING (Values in Portuguese)
export const CLOTHING_CATEGORIES = {
    tops: {
        id: 'tops',
        label: "Tops",
        subcategories: [
            {
                id: 'cropped',
                label: 'Croppeds',
                items: [
                    { id: "long_sleeve_crop_top", label: "Long Sleeve Crop Top", value: "Long Sleeve Crop Top", description: "Top com manga longa" },
                    { id: "tank_crop_top", label: "Tank Crop Top", value: "Tank Crop Top", description: "Top simples com alça" },
                    { id: "bralette_crop_top", label: "Bralette", value: "bralette" },
                ]
            },
            {
                id: 'casual',
                label: 'Casual',
                items: [
                    { id: "babylook_casual", label: "T-Shirt Babylook", value: "camiseta ajustada" },
                    { id: "oversized_casual", label: "T-Shirt Oversized", value: "camiseta oversized" },
                    { id: "reagata_casual", label: "Alcinha", value: "regata de alcinha" },
                ]
            },
            {
                id: 'gothic',
                label: 'Gótico',
                items: [
                    { id: "goth_top", label: "Top Gótico", value: "top gótico" },
                    { id: "goth_lace_corset", label: "Corpete de Renda", value: "corpete de renda" },
                    { id: "goth_fishnet_top", label: "Top de Arrastão", value: "top de arrastão" },
                    { id: "goth_band_tee", label: "Camiseta de Banda", value: "camiseta de banda vintage" },
                ]
            }
        ]
    },
    bottoms: {
        id: 'bottoms',
        label: "Bottoms",
        subcategories: [
            {
                id: 'skirts',
                label: 'Saias',
                groups: [
                    { id: 'mini', label: 'Mini' },
                    { id: 'midi', label: 'Midi' },
                    { id: 'maxi', label: 'Maxi' }
                ],
                items: [
                    { id: "micro_skirt", label: "Micro Saia", value: "mini saia", group: 'mini', description: "Curta" },
                    { id: "pleated_mini", label: "Plissada (Tennis)", value: "saia plissada curta", group: 'mini' },
                    { id: "leather_mini", label: "Mini de Couro", value: "mini saia de couro", group: 'mini' },
                    { id: "cargo_mini", label: "Mini Cargo", value: "mini saia cargo", group: 'mini' },
                    { id: "denim_mini", label: "Mini Jeans", value: "mini saia jeans", group: 'mini' },

                    { id: "pencil_skirt", label: "Saia Lápis", value: "saia lápis", group: 'midi' },
                    { id: "slip_skirt", label: "Saia Satin (Slip)", value: "saia de cetim", group: 'midi' },
                    { id: "a_line_midi", label: "Evasê / A-Line", value: "saia evasê midi", group: 'midi' },

                    { id: "boho_skirt", label: "Saia Boho", value: "saia longa boho", group: 'maxi' },
                    { id: "slit_maxi", label: "Longa com Fenda", value: "saia longa com fenda alta", group: 'maxi' },
                    { id: "denim_maxi", label: "Longa Jeans", value: "saia jeans longa", group: 'maxi' },
                ]
            },
            {
                id: 'shorts',
                label: 'Shorts',
                items: [
                    { id: "hot_pants", label: "Hot Pants", value: "short cintura alta", description: "Cintura alta" },
                    { id: "denim_shorts", label: "Short Jeans Destroyed", value: "short jeans destroyed" },
                    { id: "biker", label: "Biker (Ciclista)", value: "short de ciclista" },
                    { id: "tailored_short", label: "Short Alfaiataria", value: "short de alfaiataria" },
                    { id: "leather_shorts", label: "Short de Couro", value: "short de couro" },
                ]
            },
            {
                id: 'pants',
                label: 'Calças',
                items: [
                    { id: "wide_leg", label: "Wide Leg", value: "calça wide leg" },
                    { id: "skinny_jeans", label: "Skinny Jeans", value: "calça jeans skinny" },
                    { id: "cargo_pants", label: "Calça Cargo", value: "calça cargo" },
                    { id: "leather_pants", label: "Calça de Couro", value: "calça de couro" },
                ]
            },
            {
                id: 'leggings',
                label: 'Leggings',
                items: [
                    { id: "high_waist_leggings", label: "Cintura Alta", value: "legging cintura alta" },
                    { id: "mesh_leggings", label: "Com Tela", value: "legging com tela" },
                    { id: "leather_leggings", label: "De Couro", value: "legging de couro" },
                ]
            },
            {
                id: 'gothic_bottoms',
                label: 'Gótico',
                items: [
                    { id: "gothic_skirt", label: "Saia Gótica", value: "saia gótica" },
                    { id: "fishnet_leggings", label: "Legging de Arrastão", value: "legging de arrastão" },
                    { id: "lace_up_pants", label: "Calça com Amarração", value: "calça com amarração" },
                    { id: "platform_pants", label: "Calça Plataforma", value: "calça plataforma" },
                    { id: "gothic_shorts", label: "Shorts Gótico", value: "shorts gótico" },
                    { id: "corset_skirt", label: "Saia Corset", value: "saia estilo corset" },
                    { id: "leather_gothic_skirt", label: "Saia de Couro", value: "saia gótica de couro" },
                    { id: "pleated_gothic_skirt", label: "Plissada Gótica", value: "saia plissada gótica" },
                ]
            }
        ]
    },
    bikinis: {
        id: 'bikinis',
        label: "Biquínis",
        subcategories: [
            {
                id: 'sets',
                label: 'Conjuntos',
                items: [
                    { id: "micro_bikini", label: "Micro Biquíni", value: "micro biquíni" },
                    { id: "triangle_bikini", label: "Cortininha", value: "biquíni cortininha" },
                    { id: "bandeau_bikini", label: "Tomara que Caia", value: "biquíni tomara que caia" },
                    { id: "thong_bikini", label: "Fio Dental", value: "biquíni cavado" }, // Safe PT term
                ]
            },
            {
                id: 'one_piece',
                label: 'Maiôs',
                items: [
                    { id: "cutout_swimsuit", label: "Recortes", value: "maiô com recortes" },
                    { id: "plunge_swimsuit", label: "Decote Profundo", value: "maiô com decote profundo" },
                    { id: "classic_swimsuit", label: "Clássico", value: "maiô clássico" },
                    { id: "high_leg_swimsuit", label: "Cavado", value: "maiô cavado" },
                ]
            }
        ]
    },
    dresses: {
        id: 'dresses',
        label: "Vestidos e corpo todo",
        subcategories: [
            {
                id: 'mini_dress',
                label: 'Curtos (Mini)',
                items: [
                    { id: "bodycon_mini", label: "Tubinho Justo", value: "vestido tubinho curto" },
                    { id: "slip_mini", label: "Alcinha (Slip)", value: "vestido de alcinha curto" },
                    { id: "wrap_mini", label: "Envelope Curto", value: "vestido envelope curto" },
                    { id: "cutout_mini", label: "Recortes", value: "vestido curto com recortes" },
                    { id: "latext_mini", label: "Látex Justo", value: "vestido de látex curto" },
                ]
            },
            {
                id: 'midi_maxi',
                label: 'Longos / Midi',
                items: [
                    { id: "slit_gown", label: "Longo com Fenda", value: "vestido longo com fenda" },
                    { id: "sundress_maxi", label: "Longo Fluido", value: "vestido longo fluido" },
                    { id: "mermaid_dress", label: "Sereia", value: "vestido sereia" },
                    { id: "midi_bodycon", label: "Midi Justo", value: "vestido midi justo" },
                    { id: "backless_gown", label: "Costas Nuas", value: "vestido longo costas nuas" },
                ]
            },
            {
                id: 'jumpsuits',
                label: 'Macacões',
                items: [
                    { id: "denim_jumpsuit", label: "Macacão Jeans", value: "macacão jeans" },
                    { id: "formal_jumpsuit", label: "Macacão Social", value: "macacão social" },
                    { id: "casual_jumpsuit", label: "Macacão Casual", value: "macacão casual" },
                ]
            },
        ]
    },
    fantasies: {
        id: 'fantasies',
        label: "Fantasies",
        subcategories: [
            {
                id: 'christmas',
                label: 'Natalinas',
                items: [
                    { id: "sensual_santa_dress", label: "Vestido de Mamae Noel Sensual", value: "Vestido de Mamãe Noel em veludo carmesim justo, acabamento em pele branca felpuda, minissaia evasê e cinto de couro com fivela dourada." },
                    { id: "sensual_gothic_santa_dress", label: "Vestido de mamãe noel gótica sensual", value: "Vestido de Mamãe Noel gótica em veludo preto meia-noite, minissaia em camadas de tule, corpete de renda ajustado com cadarços de cetim, acabamento de pele sintética cinza escuro e detalhes em prata envelhecida" },
                ]
            },
            {
                id: 'sexy_costumes',
                label: 'Fantasias Sensuais',
                items: [
                    { id: "nurse_costume", label: "Fantasia de Enfermeira", value: "fantasia de enfermeira sensual" },
                    { id: "schoolgirl_costume", label: "Fantasia de Estudante", value: "fantasia de estudante sensual" },
                    { id: "maid_costume", label: "Fantasia de Empregada", value: "fantasia de empregada sensual" },
                    { id: "police_costume", label: "Fantasia de Policial", value: "fantasia de policial sensual" },
                    { id: "bunny_costume", label: "Fantasia de Coelhinha", value: "fantasia de coelhinha sensual" },
                    { id: "catwoman_costume", label: "Fantasia de Mulher Gato", value: "fantasia de mulher gato sensual" },
                ]
            },
        ]
    },
    shoes: {
        id: 'shoes',
        label: 'Sapatos',
        subcategories: [
            {
                id: 'heels',
                label: 'Saltos',
                items: [
                    { id: "stiletto", label: "Stiletto", value: "salto stiletto" },
                    { id: "pump", label: "Scarpin (Pump)", value: "scarpin clássico" },
                    { id: "strappy_heels", label: "Sandália de Tiras", value: "sandália de salto com tiras" },
                    { id: "platform_heels", label: "Plataforma", value: "salto plataforma" },
                    { id: "block_heels", label: "Salto Bloco", value: "salto bloco" },
                    { id: "clear_heels", label: "Transparente", value: "salto transparente" },
                    { id: "wedge", label: "Anabela / Wedge", value: "salto anabela" },
                    { id: "mules_heels", label: "Mule de Salto", value: "mule de salto" },
                    { id: "peep_toe", label: "Peep Toe", value: "sapato peep toe" },
                ]
            },
            {
                id: 'boots',
                label: 'Botas',
                items: [
                    { id: "knee_high", label: "Cano Alto", value: "botas de cano alto" },
                    { id: "over_knee", label: "Over-the-Knee", value: "botas over-the-knee" },
                    { id: "ankle_boot", label: "Ankle Boot", value: "bota de cano curto" },
                    { id: "combat_boot", label: "Coturno", value: "coturno" },
                    { id: "cowboy_boot", label: "Texana", value: "bota texana" },
                    { id: "chelsea_boot", label: "Chelsea", value: "bota chelsea" },
                ]
            },
            {
                id: 'flat',
                label: 'Baixos / Tênis',
                items: [
                    { id: "sneakers_white", label: "Tênis Branco", value: "tênis branco" },
                    { id: "sneakers_chunky", label: "Tênis Chunky", value: "tênis chunky" },
                    { id: "high_top", label: "Cano Alto (Tênis)", value: "tênis cano alto" },
                    { id: "loafers", label: "Mocassim", value: "mocassim" },
                    { id: "ballet_flats", label: "Sapatilha", value: "sapatilha" },
                    { id: "gladiator", label: "Gladiadora", value: "sandália gladiadora" },
                    { id: "slides", label: "Chinelo / Slide", value: "chinelo slide" },
                ]
            }
        ]
    }
};

// 3. POSES (Values in Portuguese - Safe)
export const POSES_CATEGORIES = [
    {
        id: 'standard',
        label: 'Padrão',
        items: [
            { id: "default_change", label: "Mude a pose (Livre)", value: "mude a pose" },
            { id: "standing", label: "De Pé", value: "pose de pé" },
            { id: "walking", label: "Caminhando", value: "caminhando" },
            { id: "sitting_chair", label: "Sentada (Cadeira)", value: "sentada em uma cadeira" },
            { id: "portrait", label: "Retrato", value: "foto de retrato" },
            { id: "hands_pockets", label: "Mãos no Bolso", value: "mãos nos bolsos" },
            { id: "arms_crossed", label: "Braços Cruzados", value: "braços cruzados" },
            { id: "looking_side", label: "Olhando para o Lado", value: "olhando para o lado" },
            { id: "hair_flip", label: "Jogando o Cabelo", value: "jogando o cabelo" },
            { id: "over_shoulder", label: "De costas, olhando por cima do Ombro", value: "de costas, olhando por cima do ombro" },
            { id: "costas", label: "De Costas", value: "de costas" },
        ]
    },
    {
        id: 'sensual',
        label: 'Ousadas',
        items: [
            { id: "kneeling", label: "Ajoelhada", value: "ajoelhada, pose elegante" },
            { id: "lying_back", label: "Deitada de Costas", value: "deitada de costas, pose de moda" },
            { id: "crawling", label: "Engatinhando (Pose)", value: "pose dinâmica no chão" },
            { id: "arched_back", label: "Costas Arqueadas", value: "costas arqueadas, pose artística" },
            { id: "looking_shoulder", label: "Olhando Ombro", value: "olhando para trás por cima do ombro" },
            { id: "legs_up", label: "Pernas pro Ar", value: "deitada pernas para cima, pose criativa" },
            { id: "squatting", label: "Agachada (Squat)", value: "agachada, pose moderna" },
        ]
    },
    {
        id: 'editorial',
        label: 'Editorial',
        items: [
            { id: "high_fashion", label: "High Fashion", value: "pose high fashion, angular" },
            { id: "hand_hip", label: "Mão na Cintura", value: "mão na cintura, pose confiante" },
            { id: "leaning_wall", label: "Apoio na Parede", value: "apoiada na parede" },
            { id: "jumping", label: "Pulando", value: "pulando, pose dinâmica" },
            { id: "running", label: "Correndo", value: "correndo" },
        ]
    }
];
export const POSES = POSES_CATEGORIES.flatMap(c => c.items);


// 4. SCENERY (Values in Portuguese)
export const SCENERY_CATEGORIES = [
    {
        id: 'indoor',
        label: 'Estúdio',
        items: [
            { id: "minimalist", label: "Parede Branca de estúdio", value: "Um amplo ambiente de estúdio profissional, vazio e minimalista, com fundo infinito branco" },
        ]
    },
    {
        id: 'turistic_landmarks',
        label: 'Pontos turísticos',
        items: [
            { id: "torre_eiffel", label: "Torre Eiffel", value: "A realistic nighttime photograph of the Eiffel Tower base and structure. Warm golden sodium lights illuminate the intricate ironwork from within, casting long, dramatic geometric shadows across the beams and the wet asphalt ground below. The metal texture is rough and detailed. In the background, out of focus, the city lights of Paris glitter and reflect on the River Seine under a dark indigo sky" },
        ]
    },
];
export const SCENERY = SCENERY_CATEGORIES.flatMap(c => c.items);

// Attributes 
/*
export const FABRICS = [
    { id: "cotton", label: "Algodão", value: "algodão" },
    { id: "silk", label: "Seda", value: "seda" },
    { id: "satin", label: "Cetim", value: "cetim" },
    { id: "velvet", label: "Veludo", value: "veludo" },
    { id: "leather", label: "Couro", value: "couro" },
    { id: "latex", label: "Látex", value: "vinil" }, // Sanitized: 'latex' -> 'vinil'
    { id: "denim", label: "Jeans", value: "jeans" },
    { id: "lace", label: "Renda", value: "renda" },
    { id: "spandex", label: "Spandex", value: "spandex" },
    { id: "fur", label: "Pele (Fake)", value: "pele falsa" },
]; */

export const NECKLINES = [
    { id: "hard_plunging", label: "Decote Profundo", value: "plunging neckline" }, // plunging neckline
    { id: "cleavage", label: "Busto (Decotado)", value: "decote baixo" },
    { id: "v_neck", label: "Decote V", value: "decote em V" },
    { id: "off_shoulder", label: "Ombro a Ombro", value: "ombro a ombro" },
    { id: "strapless", label: "Tomara que caia", value: "tomara que caia" },
    { id: "halter", label: "Frente Única", value: "frente única" },
    { id: "turtleneck", label: "Gola Alta", value: "gola alta" },
];
