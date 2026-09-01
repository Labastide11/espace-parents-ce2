// V34.94 — Couche multilingue Espace Parents (FR / AR / ES / EN)
// V35.21 - traduction ciblée : emploi du temps + introduction fixe des devoirs
// Périmètre traduit : accueil, infos de classe, matériel, aide, numérique,
// ressources, navigation/bandeaux, pied de page et structure/matières de l'emploi du temps.
// Sont volontairement laissés en français : devoirs, évaluations, vacances,
// défis famille, « Ce que nous apprenons » et descriptions pédagogiques détaillées.
(function(){
'use strict';
const LANGS=['fr','ar','es','en'];
const META={
  fr:{label:'Français',flag:'🇫🇷',locale:'fr-FR',dir:'ltr'},
  ar:{label:'العربية',flag:'🇦🇪',locale:'ar',dir:'rtl'},
  es:{label:'Español',flag:'🇪🇸',locale:'es-ES',dir:'ltr'},
  en:{label:'English',flag:'🇬🇧',locale:'en-GB',dir:'ltr'}
};
const EXACT={
  'Espace Parents':{ar:'فضاء أولياء الأمور',es:'Espacio para familias',en:'Parent Space'},
  'CE2 — La classe de Joël Cotty':{ar:'CE2 — صف جويل كوتي',es:'CE2 — La clase de Joël Cotty',en:"CE2 — Joël Cotty's class"},
  'Devoirs':{ar:'الواجبات',es:'Deberes',en:'Homework'},
  'Infos de la classe':{ar:'معلومات الصف',es:'Información de la clase',en:'Class information'},
  'Emploi du temps':{ar:'الجدول الدراسي',es:'Horario',en:'Timetable'},
  'Ce que nous apprenons':{ar:'ما نتعلمه',es:'Lo que aprendemos',en:'What we are learning'},
  'Accueil Parents':{ar:'الصفحة الرئيسية للأولياء',es:'Inicio familias',en:'Parents home'},
  'Aujourd’hui':{ar:'اليوم',es:'Hoy',en:'Today'},
  'Temps de travail prévu : 10 à 15 minutes':{ar:'المدة المتوقعة للعمل: من 10 إلى 15 دقيقة',es:'Tiempo previsto de trabajo: 10 a 15 minutos',en:'Expected work time: 10 to 15 minutes'},
  'Bonjour,':{ar:'مرحبًا،',es:'Hola,',en:'Hello,'},
  'À la maison, les devoirs restent courts et simples : quelques minutes de lecture, de mémorisation ou un petit entraînement oral pour revoir tranquillement ce qui a été travaillé en classe.':{ar:'في المنزل، تبقى الواجبات قصيرة وبسيطة: بضع دقائق من القراءة أو الحفظ أو تدريب شفهي قصير لمراجعة ما تم العمل عليه في الصف بهدوء.',es:'En casa, los deberes siguen siendo breves y sencillos: unos minutos de lectura, memorización o un pequeño ejercicio oral para repasar tranquilamente lo trabajado en clase.',en:'At home, homework stays short and simple: a few minutes of reading, memorising or a short oral activity to calmly review what was worked on in class.'},
  'L’objectif n’est pas de refaire la journée d’école, mais d’installer une petite routine régulière, sans pression, et de partager parfois un petit défi en famille.':{ar:'الهدف ليس إعادة يوم المدرسة في المنزل، بل بناء عادة صغيرة ومنتظمة دون ضغط، وأحيانًا مشاركة تحدٍّ عائلي بسيط.',es:'El objetivo no es repetir la jornada escolar en casa, sino crear una pequeña rutina regular, sin presión, y compartir de vez en cuando un pequeño reto en familia.',en:'The goal is not to repeat the school day at home, but to build a short regular routine without pressure and sometimes share a small family challenge.'},
  'Ils se dérouleront ainsi :':{ar:'ستكون على النحو الآتي:',es:'Se organizarán así:',en:'They will work like this:'},
  'Cordialement,':{ar:'مع خالص التحية،',es:'Un cordial saludo,',en:'Kind regards,'},
  'Semaine précédente':{ar:'الأسبوع السابق',es:'Semana anterior',en:'Previous week'},
  'Semaine suivante':{ar:'الأسبوع التالي',es:'Semana siguiente',en:'Next week'},
  'Retour auto':{ar:'العودة للوضع التلقائي',es:'Volver a automático',en:'Back to automatic'},
  'Les apprentissages de la période':{ar:'تعلمات هذه الفترة',es:'Aprendizajes del periodo',en:'Learning for this term'},
  'Ces objectifs viennent directement des progressions de la classe et évoluent avec la période.':{ar:'تأتي هذه الأهداف مباشرة من تخطيط الصف وتتغير حسب الفترة.',es:'Estos objetivos proceden directamente de la programación de la clase y evolucionan según el periodo.',en:'These goals come directly from the class learning plan and change with each term.'},
  'Cahier de liaison & informations':{ar:'دفتر التواصل والمعلومات',es:'Cuaderno de comunicación e información',en:'Home-school notebook & information'},
  'Rappels':{ar:'تذكيرات',es:'Recordatorios',en:'Reminders'},
  'Rappels du cahier de liaison':{ar:'ملاحظات في دفتر التواصل بين الأسرة والمدرسة',es:'Notas en el cuaderno familia-escuela',en:'Notes in the home-school notebook'},
  'À retenir toute l’année':{ar:'للتذكّر طوال العام',es:'Para recordar todo el año',en:'Keep in mind all year'},
  'Les repères qui restent valables au quotidien':{ar:'تذكيرات تبقى صالحة يوميًا',es:'Recordatorios válidos durante todo el año',en:'Reminders that remain useful all year'},
  'En ce moment':{ar:'في الوقت الحالي',es:'En este momento',en:'Right now'},
  'Les informations et dates utiles maintenant':{ar:'المعلومات والتواريخ المفيدة الآن',es:'Información y fechas útiles ahora',en:'Useful information and dates right now'},
  'Les repères permanents restent visibles toute l’année. Les informations ponctuelles apparaissent lorsqu’elles deviennent utiles.':{ar:'تبقى التذكيرات الدائمة ظاهرة طوال العام، وتظهر المعلومات المؤقتة عندما تصبح مفيدة.',es:'Los recordatorios permanentes permanecen visibles todo el año. La información puntual aparece cuando resulta útil.',en:'Permanent reminders stay visible all year. One-off information appears when it becomes useful.'},
  'À venir':{ar:'قريبًا',es:'Próximamente',en:'Coming up'},
  'Matériel':{ar:'اللوازم',es:'Material',en:'Supplies'},
  'Aider mon enfant':{ar:'مساعدة طفلي',es:'Ayudar a mi hijo/a',en:'Helping my child'},
  'Écrans & numérique':{ar:'الشاشات والتقنية',es:'Pantallas y tecnología',en:'Screens & digital'},
  'Ressources utiles':{ar:'موارد مفيدة',es:'Recursos útiles',en:'Useful resources'},
  'Rappels des mots du cahier de liaison':{ar:'تذكيرات من دفتر التواصل',es:'Recordatorios del cuaderno de comunicación',en:'Home-school notebook reminders'},
  'Retrouvez ici les principaux mots et informations transmis dans le cahier de liaison.':{ar:'ستجدون هنا أهم الرسائل والمعلومات التي تم إرسالها في دفتر التواصل.',es:'Aquí encontrará los principales mensajes e informaciones enviados en el cuaderno de comunicación.',en:'Here you can find the main messages and information sent in the home-school notebook.'},
  'Sorties, rencontres et temps forts déjà programmés dans Progressions CE2, complétés si besoin par l’enseignant.':{ar:'الخرجات واللقاءات والأنشطة المهمة المبرمجة، مع إمكانية إضافة معلومات من المعلم عند الحاجة.',es:'Salidas, encuentros y momentos importantes ya programados, completados por el docente si es necesario.',en:'Trips, meetings and key events already scheduled, with extra information added by the teacher when needed.'},
  'Matériel scolaire':{ar:'اللوازم المدرسية',es:'Material escolar',en:'School supplies'},
  'Le matériel individuel demandé pour le CE2 et la petite réserve à conserver à la maison.':{ar:'اللوازم الفردية المطلوبة في CE2 ومخزون صغير يُحتفظ به في المنزل.',es:'El material individual solicitado para CE2 y una pequeña reserva para guardar en casa.',en:'The individual supplies needed for CE2 and a small reserve to keep at home.'},
  'Matériel individuel':{ar:'اللوازم الفردية',es:'Material individual',en:'Individual supplies'},
  'Petite réserve à conserver à la maison':{ar:'مخزون صغير للاحتفاظ به في المنزل',es:'Pequeña reserva para guardar en casa',en:'Small reserve to keep at home'},
  'Merci de prévoir quelques fournitures de remplacement :':{ar:'يرجى توفير بعض اللوازم الاحتياطية:',es:'Por favor, tenga algunas piezas de repuesto:',en:'Please keep a few replacement supplies available:'},
  'Merci de marquer le matériel au prénom de votre enfant.':{ar:'يرجى كتابة اسم طفلك على لوازمه.',es:'Por favor, marque el material con el nombre de su hijo/a.',en:"Please label your child's supplies with their first name."},
  'Le matériel est à vérifier et à renouveler régulièrement pendant l’année.':{ar:'يرجى فحص اللوازم وتجديدها بانتظام خلال السنة.',es:'El material debe revisarse y reponerse regularmente durante el curso.',en:'Supplies should be checked and replaced regularly during the year.'},
  'Il n’est pas nécessaire d’acheter du matériel coûteux : du matériel simple, solide et fonctionnel convient parfaitement.':{ar:'لا حاجة لشراء لوازم باهظة الثمن: اللوازم البسيطة والمتينة والعملية مناسبة تمامًا.',es:'No es necesario comprar material caro: un material sencillo, resistente y funcional es perfectamente adecuado.',en:'There is no need to buy expensive supplies: simple, sturdy and practical items are perfectly suitable.'},
  'À la maison, quelques minutes suffisent.':{ar:'في المنزل، تكفي بضع دقائق.',es:'En casa, bastan unos minutos.',en:'At home, a few minutes are enough.'},
  'L’objectif est d’accompagner votre enfant, pas de refaire la classe.':{ar:'الهدف هو مساعدة طفلك، وليس إعادة الدرس في المنزل.',es:'El objetivo es acompañar a su hijo/a, no repetir la clase.',en:'The goal is to support your child, not to repeat the lesson at home.'},
  'Lire un peu chaque jour':{ar:'القراءة قليلًا كل يوم',es:'Leer un poco cada día',en:'Read a little every day'},
  'Écouter votre enfant lire, discuter du texte et poser 2 ou 3 questions simples.':{ar:'استمعوا إلى طفلكم وهو يقرأ، تحدثوا عن النص واطرحوا سؤالين أو ثلاثة أسئلة بسيطة.',es:'Escuche a su hijo/a leer, hable sobre el texto y haga 2 o 3 preguntas sencillas.',en:'Listen to your child read, talk about the text and ask 2 or 3 simple questions.'},
  'Apprendre une leçon':{ar:'تعلّم درس',es:'Aprender una lección',en:'Learn a lesson'},
  'Lire, cacher, redire avec ses propres mots, puis vérifier.':{ar:'اقرأ، أخفِ النص، أعده بكلماتك، ثم تحقق.',es:'Leer, ocultar, repetir con sus propias palabras y después comprobar.',en:'Read, hide it, say it again in your own words, then check.'},
  'Calcul mental':{ar:'الحساب الذهني',es:'Cálculo mental',en:'Mental maths'},
  'Privilégier de petits jeux oraux plutôt que de longues séries d’exercices.':{ar:'يفضل استخدام ألعاب شفهية قصيرة بدل سلاسل طويلة من التمارين.',es:'Es mejor hacer pequeños juegos orales que largas series de ejercicios.',en:'Prefer short oral games rather than long sets of exercises.'},
  'Poésie':{ar:'الشعر',es:'Poesía',en:'Poetry'},
  'Apprendre progressivement, quelques vers à la fois.':{ar:'تعلّم تدريجيًا، بضعة أبيات في كل مرة.',es:'Aprender progresivamente, unos versos cada vez.',en:'Learn gradually, a few lines at a time.'},
  'En cas d’erreur':{ar:'في حال الخطأ',es:'En caso de error',en:'When there is a mistake'},
  'Laisser chercher, donner un indice et éviter de donner directement la réponse.':{ar:'اتركوا الطفل يبحث، أعطوه تلميحًا وتجنبوا إعطاء الإجابة مباشرة.',es:'Deje que busque, dé una pista y evite dar directamente la respuesta.',en:'Let your child think, give a clue and avoid giving the answer straight away.'},
  'Encourager les efforts':{ar:'تشجيع الجهد',es:'Animar el esfuerzo',en:'Encourage effort'},
  'Valoriser les progrès et la régularité, pas seulement le résultat.':{ar:'قدّروا التقدم والاستمرارية، وليس النتيجة فقط.',es:'Valore los progresos y la constancia, no solo el resultado.',en:'Value progress and consistency, not only the result.'},
  'En cas de difficulté persistante, n’hésitez pas à en parler avec l’enseignant.':{ar:'إذا استمرت الصعوبة، لا تترددوا في التحدث مع المعلم.',es:'Si la dificultad persiste, no dude en hablar con el docente.',en:'If a difficulty persists, please speak with the teacher.'},
  'Des conseils fiables pour accompagner les usages numériques à la maison.':{ar:'نصائح موثوقة لمرافقة استخدام التقنية في المنزل.',es:'Consejos fiables para acompañar el uso digital en casa.',en:'Reliable advice to support digital use at home.'},
  'Accompagner les écrans':{ar:'مرافقة استخدام الشاشات',es:'Acompañar el uso de pantallas',en:'Supporting screen use'},
  'Conseils et repères pour un usage raisonné.':{ar:'نصائح وإرشادات لاستخدام متوازن.',es:'Consejos y referencias para un uso equilibrado.',en:'Advice and guidance for balanced use.'},
  'Conseils 7–12 ans':{ar:'نصائح من 7 إلى 12 سنة',es:'Consejos para 7–12 años',en:'Advice for ages 7–12'},
  'Un guide pour les enfants et leurs parents.':{ar:'دليل للأطفال وأولياء أمورهم.',es:'Una guía para niños y familias.',en:'A guide for children and their families.'},
  'Contrôle parental':{ar:'الرقابة الأبوية',es:'Control parental',en:'Parental controls'},
  'Téléphones, tablettes, ordinateurs et consoles.':{ar:'الهواتف والأجهزة اللوحية والحواسيب وأجهزة الألعاب.',es:'Teléfonos, tabletas, ordenadores y consolas.',en:'Phones, tablets, computers and game consoles.'},
  'Documents, liens pratiques et ressources pour accompagner votre enfant.':{ar:'وثائق وروابط وموارد عملية لمساعدة طفلك.',es:'Documentos, enlaces prácticos y recursos para acompañar a su hijo/a.',en:'Documents, useful links and resources to support your child.'},
  'Directeur : Gilles Maigron':{ar:'المدير: Gilles Maigron',es:'Director: Gilles Maigron',en:'Headteacher: Gilles Maigron'},
  'Info':{ar:'معلومة',es:'Info',en:'Info'},
  'Période 1':{ar:'الفترة 1',es:'Periodo 1',en:'Term 1'},
  'Période 2':{ar:'الفترة 2',es:'Periodo 2',en:'Term 2'},
  'Période 3':{ar:'الفترة 3',es:'Periodo 3',en:'Term 3'},
  'Période 4':{ar:'الفترة 4',es:'Periodo 4',en:'Term 4'},
  'Période 5':{ar:'الفترة 5',es:'Periodo 5',en:'Term 5'},
  'Semaine':{ar:'الأسبوع',es:'Semana',en:'Week'},
  'Semaine en cours':{ar:'الأسبوع الحالي',es:'Semana actual',en:'Current week'},
  'Aucune semaine':{ar:'لا يوجد أسبوع',es:'Ninguna semana',en:'No week'},
  'Aucun devoir programmé.':{ar:'لا توجد واجبات مبرمجة.',es:'No hay deberes programados.',en:'No homework is scheduled.'},
  'Aucun devoir cette semaine.':{ar:'لا توجد واجبات هذا الأسبوع.',es:'No hay deberes esta semana.',en:'No homework this week.'},
  'Rappels pratiques':{ar:'تذكيرات عملية',es:'Recordatorios prácticos',en:'Practical reminders'},
  'Ne comptent pas comme devoirs':{ar:'لا تُحسب ضمن الواجبات',es:'No cuentan como deberes',en:'Do not count as homework'},
  'Natation':{ar:'السباحة',es:'Natación',en:'Swimming'},
  'EPS':{ar:'التربية البدنية',es:'Educación física',en:'PE'},
  'EPS — Domec':{ar:'التربية البدنية — Domec',es:'Educación física — Domec',en:'PE — Domec'},
  'Pense à préparer ton maillot, ta serviette et les affaires demandées pour la piscine.':{ar:'تذكّر تجهيز لباس السباحة والمنشفة والأغراض المطلوبة للمسبح.',es:'Recuerda preparar el bañador, la toalla y el material solicitado para la piscina.',en:'Remember to prepare your swimsuit, towel and the items needed for the pool.'},
  'Pense à préparer une tenue de sport adaptée pour la séance à Domec.':{ar:'تذكّر تجهيز ملابس رياضية مناسبة لحصة Domec.',es:'Recuerda preparar ropa deportiva adecuada para la sesión en Domec.',en:'Remember to prepare suitable sports clothes for the session at Domec.'},
  'Pense à prévoir une tenue adaptée pour l’activité physique.':{ar:'تذكّر ارتداء ملابس مناسبة للنشاط البدني.',es:'Recuerda llevar ropa adecuada para la actividad física.',en:'Remember to wear suitable clothes for physical activity.'},
  'Voir l’essentiel':{ar:'عرض الأساسيات',es:'Ver lo esencial',en:'See the essentials'},
  'Voici les principaux apprentissages travaillés en classe. D’autres compétences sont également exercées au quotidien.':{ar:'هذه هي أهم التعلمات التي نعمل عليها في الصف. كما نتمرن يوميًا على مهارات أخرى.',es:'Estos son los principales aprendizajes trabajados en clase. También se practican otras competencias a diario.',en:'These are the main areas of learning worked on in class. Other skills are also practised every day.'},
  'grand apprentissage à retenir pendant cette période.':{ar:'تعلّم أساسي لهذه الفترة.',es:'aprendizaje importante para este periodo.',en:'key learning goal for this term.'},
  'grands apprentissages à retenir pendant cette période.':{ar:'تعلمات أساسية لهذه الفترة.',es:'aprendizajes importantes para este periodo.',en:'key learning goals for this term.'},
  'En classe':{ar:'في الصف',es:'En clase',en:'In class'},
  'Besoin d’aide ?':{ar:'هل تحتاج إلى مساعدة؟',es:'¿Necesitas ayuda?',en:'Need help?'},
  'Pour revoir la leçon si besoin :':{ar:'لمراجعة الدرس عند الحاجة:',es:'Para repasar la lección si es necesario:',en:'To review the lesson if needed:'},
  'Défi famille':{ar:'تحدي عائلي',es:'Reto en familia',en:'Family challenge'},
  'facultatif':{ar:'اختياري',es:'opcional',en:'optional'},
  'Aujourd’hui : évaluation':{ar:'اليوم: تقييم',es:'Hoy: evaluación',en:'Today: assessment'},
  'Évaluation':{ar:'تقييم',es:'Evaluación',en:'Assessment'},
  'Déjà travaillé':{ar:'تم العمل عليه سابقًا',es:'Ya trabajado',en:'Already practised'},
  'Révisions de vacances':{ar:'مراجعة العطلة',es:'Repaso de vacaciones',en:'Holiday revision'},
  'Bonnes vacances !':{ar:'عطلة سعيدة!',es:'¡Felices vacaciones!',en:'Have a great holiday!'},
  'Joyeux Noël !':{ar:'عيد ميلاد سعيد!',es:'¡Feliz Navidad!',en:'Merry Christmas!'},
  'Aucun temps fort particulier n’est encore annoncé pour cette période.':{ar:'لا يوجد حدث مهم معلن لهذه الفترة في الوقت الحالي.',es:'Todavía no se ha anunciado ningún momento destacado para este periodo.',en:'No special event has been announced for this term yet.'},
  'affichage automatique':{ar:'عرض تلقائي',es:'visualización automática',en:'automatic display'},
  'mode test':{ar:'وضع الاختبار',es:'modo de prueba',en:'test mode'},
  'Test À venir':{ar:'اختبار «قريبًا»',es:'Prueba «Próximamente»',en:'Coming up test'}
};

// Messages « À venir » actuellement publiés.
Object.assign(EXACT,{
  '🏫 Une nouvelle année commence ! Nous prenons progressivement nos habitudes de classe et découvrons les projets de l’année. Les informations importantes seront annoncées ici au fil des semaines.':{ar:'🏫 تبدأ سنة دراسية جديدة! نتعرّف تدريجيًا على عادات الصف ومشروعات السنة. ستُنشر المعلومات المهمة هنا خلال الأسابيع.',es:'🏫 ¡Empieza un nuevo curso! Poco a poco vamos adquiriendo las rutinas de clase y descubriendo los proyectos del año. La información importante se publicará aquí a lo largo de las semanas.',en:'🏫 A new school year begins! We are gradually settling into our class routines and discovering the year’s projects. Important information will be posted here as the weeks go by.'},
  '🏊 À la piscine ! Durant cette période, la classe participe à des séances de natation à la piscine de Grazailles le vendredi après-midi. Pensez à prévoir le maillot de bain, la serviette et les affaires nécessaires. Un rappel apparaîtra également dans les devoirs avant chaque séance.':{ar:'🏊 إلى المسبح! خلال هذه الفترة يشارك الصف في حصص سباحة بمسبح Grazailles بعد ظهر الجمعة. يرجى تجهيز لباس السباحة والمنشفة والأغراض اللازمة. سيظهر أيضًا تذكير في قسم الواجبات قبل كل حصة.',es:'🏊 ¡A la piscina! Durante este periodo, la clase participa en sesiones de natación en la piscina de Grazailles los viernes por la tarde. Recuerde preparar el bañador, la toalla y el material necesario. También aparecerá un recordatorio en los deberes antes de cada sesión.',en:'🏊 Off to the pool! During this term, the class has swimming sessions at Grazailles pool on Friday afternoons. Please prepare a swimsuit, towel and the necessary items. A reminder will also appear in Homework before each session.'},
  '🌳 Direction la Cavayère ! Du 4 janvier au 5 février, la classe se rend au Pôle sportif de la Cavayère le lundi matin. Au programme : course d’orientation et sandball. Pensez à une tenue adaptée à l’activité physique et à la météo.':{ar:'🌳 إلى La Cavayère! من 4 يناير إلى 5 فبراير، يتوجه الصف إلى المركز الرياضي في La Cavayère صباح الاثنين. البرنامج: التوجيه الرياضي وsandball. يرجى ارتداء ملابس مناسبة للنشاط البدني وللطقس.',es:'🌳 ¡Rumbo a La Cavayère! Del 4 de enero al 5 de febrero, la clase va al centro deportivo de La Cavayère los lunes por la mañana. En el programa: orientación y sandball. Recuerde llevar ropa adecuada para la actividad física y el tiempo.',en:'🌳 Off to La Cavayère! From 4 January to 5 February, the class goes to the La Cavayère sports centre on Monday mornings. Activities: orienteering and sandball. Please wear clothing suitable for physical activity and the weather.'},
  '🏃 En route vers le GDVB ! En janvier, nous commençons à préparer le Grand Défi Vivez Bougez avec quelques activités courtes autour du mouvement, de la santé et de la coopération. Le Grand Défi débutera après les vacances d’hiver.':{ar:'🏃 نستعد لـ GDVB! في يناير نبدأ التحضير لـ Grand Défi Vivez Bougez من خلال أنشطة قصيرة حول الحركة والصحة والتعاون. يبدأ التحدي الكبير بعد عطلة الشتاء.',es:'🏃 ¡Camino al GDVB! En enero empezamos a preparar el Grand Défi Vivez Bougez con pequeñas actividades sobre el movimiento, la salud y la cooperación. El Gran Desafío comenzará después de las vacaciones de invierno.',en:'🏃 Getting ready for GDVB! In January we begin preparing for Grand Défi Vivez Bougez with short activities about movement, health and cooperation. The Grand Challenge will begin after the winter holiday.'},
  '🏃 Grand Défi Vivez Bougez 2027 — C’est parti ! Du 22 février au 4 avril, la classe participe au GDVB. Pendant plusieurs semaines, les élèves seront encouragés à bouger régulièrement, relever de petits défis et cumuler leurs cubes énergie.':{ar:'🏃 Grand Défi Vivez Bougez 2027 — انطلقنا! من 22 فبراير إلى 4 أبريل يشارك الصف في GDVB. خلال عدة أسابيع، سيُشجَّع التلاميذ على الحركة بانتظام وخوض تحديات صغيرة وجمع مكعبات الطاقة.',es:'🏃 Grand Défi Vivez Bougez 2027 — ¡Empezamos! Del 22 de febrero al 4 de abril, la clase participa en el GDVB. Durante varias semanas, se animará al alumnado a moverse con regularidad, superar pequeños retos y acumular cubos de energía.',en:'🏃 Grand Défi Vivez Bougez 2027 — Let’s go! From 22 February to 4 April, the class takes part in GDVB. For several weeks, pupils will be encouraged to move regularly, take on small challenges and collect energy cubes.'},
  '🏟️ Le lundi après-midi, les séances au Pôle sportif de Domec avec gymnastique et lutte constituent le temps fort EPS de la période.':{ar:'🏟️ بعد ظهر الاثنين، تشكل حصص المركز الرياضي في Domec، مع الجمباز والمصارعة، النشاط الرئيسي للتربية البدنية خلال هذه الفترة.',es:'🏟️ Los lunes por la tarde, las sesiones en el centro deportivo de Domec, con gimnasia y lucha, son el momento principal de Educación Física del periodo.',en:'🏟️ On Monday afternoons, sessions at the Domec sports centre, with gymnastics and wrestling, are the main PE activity of the term.'},
  '🎯 Chaque semaine, un nouveau défi collectif GDVB sera proposé à la classe.':{ar:'🎯 كل أسبوع سيُقترح على الصف تحدٍّ جماعي جديد ضمن GDVB.',es:'🎯 Cada semana se propondrá a la clase un nuevo reto colectivo GDVB.',en:'🎯 Each week, the class will be given a new GDVB group challenge.'}
});



// V34.97 - couverture complète des textes statiques, y compris les fragments autour des balises <strong>.
Object.assign(EXACT,{
  '10 à 15 minutes':{ar:'10 إلى 15 دقيقة',es:'10 a 15 minutos',en:'10 to 15 minutes'},
  'Rappels · dates · documents':{ar:'تذكيرات · تواريخ · وثائق',es:'Recordatorios · fechas · documentos',en:'Reminders · dates · documents'},
  'Objectifs de la période':{ar:'أهداف الفترة',es:'Objetivos del periodo',en:'Goals for the term'},
  'Voir toute la semaine':{ar:'عرض الأسبوع كاملًا',es:'Ver toda la semana',en:'View the whole week'},
  'Prochain jour de classe':{ar:'يوم الدراسة القادم',es:'Próximo día de clase',en:'Next school day'},
  'Calendrier scolaire':{ar:'التقويم المدرسي',es:'Calendario escolar',en:'School calendar'},
  'Pas de classe':{ar:'لا توجد دراسة',es:'No hay clase',en:'No school'},
  'Pas de classe prévue ce jour-là.':{ar:'لا توجد دراسة مقررة في ذلك اليوم.',es:'No hay clase prevista ese día.',en:'No class is scheduled that day.'},
  'Les élèves ne sont pas attendus à l’école.':{ar:'لا يُنتظر حضور التلاميذ إلى المدرسة.',es:'Los alumnos no tienen que acudir a la escuela.',en:'Pupils are not expected at school.'},
  'Aucune prochaine journée de classe n’est encore programmée.':{ar:'لم يتم تحديد يوم الدراسة القادم بعد.',es:'Todavía no se ha programado el próximo día de clase.',en:'The next school day has not yet been scheduled.'},
  'À la maison, les devoirs restent':{ar:'في المنزل، تبقى الواجبات',es:'En casa, los deberes siguen siendo',en:'At home, homework stays'},
  'courts et simples':{ar:'قصيرة وبسيطة',es:'breves y sencillos',en:'short and simple'},
  ': quelques minutes de lecture, de mémorisation ou un petit entraînement oral pour revoir tranquillement ce qui a été travaillé en classe.':{ar:': بضع دقائق من القراءة أو الحفظ أو تدريب شفهي قصير لمراجعة ما تم العمل عليه في الصف بهدوء.',es:': unos minutos de lectura, memorización o un pequeño ejercicio oral para repasar tranquilamente lo trabajado en clase.',en:': a few minutes of reading, memorising or a short oral activity to calmly review what was worked on in class.'},
  'L’objectif n’est pas de refaire la journée d’école, mais d’installer une':{ar:'الهدف ليس إعادة يوم المدرسة في المنزل، بل بناء',es:'El objetivo no es repetir la jornada escolar en casa, sino crear una',en:'The goal is not to repeat the school day at home, but to build a'},
  'petite routine régulière':{ar:'عادة صغيرة ومنتظمة',es:'pequeña rutina regular',en:'short regular routine'},
  ', sans pression, et de partager parfois un petit défi en famille.':{ar:'، دون ضغط، وأحيانًا مشاركة تحدٍّ عائلي بسيط.',es:', sin presión, y compartir de vez en cuando un pequeño reto en familia.',en:', without pressure, and sometimes share a small family challenge.'},
  '📚 Je revois → 🎯 Je m’entraîne → 👨‍👩‍👧 Je partage':{ar:'📚 أراجع ← 🎯 أتدرّب ← 👨‍👩‍👧 أشارك',es:'📚 Repaso → 🎯 Practico → 👨‍👩‍👧 Comparto',en:'📚 I review → 🎯 I practise → 👨‍👩‍👧 I share'},
  'Voir aussi : grandir ensemble':{ar:'انظر أيضًا: ننمو معًا',es:'Ver también: crecer juntos',en:'See also: growing together'},
  'Mots, rappels et documents':{ar:'رسائل وتذكيرات ووثائق',es:'Mensajes, recordatorios y documentos',en:'Messages, reminders and documents'},
  'Dates et événements':{ar:'تواريخ وفعاليات',es:'Fechas y eventos',en:'Dates and events'},
  'Fournitures et réserve':{ar:'لوازم ومخزون احتياطي',es:'Material y reserva',en:'Supplies and reserve'},
  'Conseils et accompagnement':{ar:'نصائح ومرافقة',es:'Consejos y acompañamiento',en:'Advice and support'},
  'Repères pour le numérique':{ar:'إرشادات للاستخدام الرقمي',es:'Orientaciones para lo digital',en:'Digital guidance'},
  'PDF, liens et documents':{ar:'ملفات PDF وروابط ووثائق',es:'PDF, enlaces y documentos',en:'PDFs, links and documents'},
  '📚 Les cahiers et les supports de travail sont fournis par l’enseignant.':{ar:'📚 يوفّر المعلم الدفاتر ووسائل العمل.',es:'📚 Los cuadernos y materiales de trabajo los proporciona el docente.',en:'📚 Exercise books and learning materials are provided by the teacher.'},
  '1 trousse':{ar:'مقلمة واحدة',es:'1 estuche',en:'1 pencil case'},
  'contenant : 2 crayons à papier HB, 1 gomme blanche, 1 taille-crayon avec réservoir, 4 stylos (bleu, noir, rouge et vert), 2 surligneurs (jaune et vert), 1 paire de ciseaux à bouts ronds et 2 bâtons de colle.':{ar:'تحتوي على: قلمين رصاص HB، ممحاة بيضاء، مبراة بخزان، 4 أقلام (أزرق وأسود وأحمر وأخضر)، قلمين للتحديد (أصفر وأخضر)، مقص ذي أطراف مستديرة وعودَي صمغ.',es:'con: 2 lápices HB, 1 goma blanca, 1 sacapuntas con depósito, 4 bolígrafos (azul, negro, rojo y verde), 2 subrayadores (amarillo y verde), 1 tijera de punta redonda y 2 barras de pegamento.',en:'containing: 2 HB pencils, 1 white eraser, 1 pencil sharpener with container, 4 pens (blue, black, red and green), 2 highlighters (yellow and green), 1 pair of round-ended scissors and 2 glue sticks.'},
  '1 règle plate de 20 cm,':{ar:'مسطرة مستقيمة بطول 20 سم،',es:'1 regla plana de 20 cm,',en:'1 flat 20 cm ruler,'},
  'rigide et non métallique':{ar:'صلبة وغير معدنية',es:'rígida y no metálica',en:'rigid and non-metallic'},
  '1 équerre':{ar:'مثلث قياس واحد',es:'1 escuadra',en:'1 set square'},
  '1 compas simple':{ar:'فرجار بسيط واحد',es:'1 compás sencillo',en:'1 simple compass'},
  '1 ardoise blanche':{ar:'لوح أبيض صغير واحد',es:'1 pizarra blanca',en:'1 small whiteboard'},
  'avec 2 feutres effaçables et 1 chiffon':{ar:'مع قلمين قابلين للمسح وقطعة قماش',es:'con 2 rotuladores borrables y 1 paño',en:'with 2 erasable markers and 1 cloth'},
  '1 boîte de crayons de couleur':{ar:'علبة أقلام تلوين واحدة',es:'1 caja de lápices de colores',en:'1 box of coloured pencils'},
  '1 boîte de feutres':{ar:'علبة أقلام تلوين لبادية واحدة',es:'1 caja de rotuladores',en:'1 box of felt-tip pens'},
  'crayons à papier':{ar:'أقلام رصاص',es:'lápices',en:'pencils'},
  'stylos bleus':{ar:'أقلام زرقاء',es:'bolígrafos azules',en:'blue pens'},
  'bâtons de colle':{ar:'أعواد صمغ',es:'barras de pegamento',en:'glue sticks'},
  'feutres d’ardoise':{ar:'أقلام السبورة',es:'rotuladores de pizarra',en:'whiteboard markers'},
  'Accompagner les écrans':{ar:'مرافقة استخدام الشاشات',es:'Acompañar el uso de pantallas',en:'Supporting screen use'},
  'Conseils et repères pour un usage raisonné.':{ar:'نصائح وإرشادات لاستخدام متوازن.',es:'Consejos y orientaciones para un uso equilibrado.',en:'Advice and guidance for balanced use.'},
  'Conseils 7–12 ans':{ar:'نصائح لعمر 7–12 سنة',es:'Consejos para 7–12 años',en:'Advice for ages 7–12'},
  'Un guide pour les enfants et leurs parents.':{ar:'دليل للأطفال وأولياء أمورهم.',es:'Una guía para niños y sus familias.',en:'A guide for children and their parents.'},
  'Contrôle parental':{ar:'الرقابة الأبوية',es:'Control parental',en:'Parental controls'},
  'Téléphones, tablettes, ordinateurs et consoles.':{ar:'الهواتف والأجهزة اللوحية والحواسيب وأجهزة الألعاب.',es:'Teléfonos, tabletas, ordenadores y consolas.',en:'Phones, tablets, computers and games consoles.'},
  'Documents, liens pratiques et ressources pour accompagner votre enfant.':{ar:'وثائق وروابط عملية وموارد لمساعدة طفلك.',es:'Documentos, enlaces prácticos y recursos para acompañar a su hijo/a.',en:'Documents, useful links and resources to support your child.'},
  'Directeur : Gilles Maigron':{ar:'المدير: Gilles Maigron',es:'Director: Gilles Maigron',en:'Headteacher: Gilles Maigron'},
  'Vacances d’été':{ar:'العطلة الصيفية',es:'Vacaciones de verano',en:'Summer holidays'},
  'Voici l’emploi du temps réel de':{ar:'هذا هو الجدول الدراسي الفعلي ليوم',es:'Este es el horario real de',en:'Here is the actual timetable for'},
  'Pas de classe aujourd’hui.':{ar:'لا توجد دراسة اليوم.',es:'Hoy no hay clase.',en:'There is no school today.'},
  'Quart d’heure de lecture':{ar:'15 دقيقة للقراءة',es:'15 minutos de lectura',en:'15 minutes of reading'},
  "Quart d'heure de lecture":{ar:'15 دقيقة للقراءة',es:'15 minutos de lectura',en:'15 minutes of reading'},
  'Vie de classe / Arts':{ar:'حياة الصف / الفنون',es:'Vida de clase / Artes',en:'Class life / Arts'},
  'Ateliers de rentrée':{ar:'ورشات بداية السنة الدراسية',es:'Talleres de inicio de curso',en:'Back-to-school workshops'},
  'Bilan de journée':{ar:'حصيلة اليوم',es:'Resumen del día',en:'Daily review'}
});

// V34.98 - finition des chaînes qui apparaissent avec une icône/flèche ou dans les zones communes.
Object.assign(EXACT,{
  'École primaire La Gravette — Carcassonne':{ar:'مدرسة La Gravette الابتدائية — Carcassonne',es:'Escuela primaria La Gravette — Carcassonne',en:'La Gravette Primary School — Carcassonne'},
  'Fiches de renseignement + assurance à remplir':{ar:'استمارات المعلومات + التأمين المطلوب استكمالهما',es:'Fichas de información + seguro por completar',en:'Information forms + insurance to complete'},
  'Information de dernière minute':{ar:'معلومة عاجلة',es:'Información de última hora',en:'Latest information'},
  'Ouvrir les infos de la classe.':{ar:'فتح معلومات الصف.',es:'Abrir la información de la clase.',en:'Open class information.'},
  'Coordonnées de l’école':{ar:'بيانات الاتصال بالمدرسة',es:'Datos de contacto de la escuela',en:'School contact details'},
  'Rubriques de l’espace Parents':{ar:'أقسام فضاء أولياء الأمور',es:'Secciones del espacio para familias',en:'Parent Space sections'},
  'Rubriques des informations de la classe':{ar:'أقسام معلومات الصف',es:'Secciones de la información de la clase',en:'Class information sections'},
  'Choisir la langue':{ar:'اختيار اللغة',es:'Elegir idioma',en:'Choose language'},
  'Progressions CE2 · Espace Parents · V35.21':{ar:'Progressions CE2 · فضاء أولياء الأمور · V35.21',es:'Progressions CE2 · Espacio para familias · V35.21',en:'Progressions CE2 · Parent Space · V35.21'}
});

const SCHEDULE_REPLACEMENTS={
  en:[
    ['Lundi','Monday'],['Mardi','Tuesday'],['Mercredi','Wednesday'],['Jeudi','Thursday'],['Vendredi','Friday'],['Samedi','Saturday'],['Dimanche','Sunday'],
    ['janvier','January'],['février','February'],['mars','March'],['avril','April'],['mai','May'],['juin','June'],['juillet','July'],['août','August'],['septembre','September'],['octobre','October'],['novembre','November'],['décembre','December'],
    ['Français','French'],['Mathématiques','Mathematics'],['Maths','Maths'],['Anglais','English'],['Sciences','Science'],['Histoire','History'],['Géographie','Geography'],['EPS','PE'],['Éducation physique','PE'],['Arts','Arts'],['Éducation musicale','Music'],['Lecture','Reading']
  ],
  es:[
    ['Lundi','Lunes'],['Mardi','Martes'],['Mercredi','Miércoles'],['Jeudi','Jueves'],['Vendredi','Viernes'],['Samedi','Sábado'],['Dimanche','Domingo'],
    ['janvier','enero'],['février','febrero'],['mars','marzo'],['avril','abril'],['mai','mayo'],['juin','junio'],['juillet','julio'],['août','agosto'],['septembre','septiembre'],['octobre','octubre'],['novembre','noviembre'],['décembre','diciembre'],
    ['Français','Francés'],['Mathématiques','Matemáticas'],['Maths','Matemáticas'],['Anglais','Inglés'],['Sciences','Ciencias'],['Histoire','Historia'],['Géographie','Geografía'],['EPS','Educación física'],['Éducation physique','Educación física'],['Arts','Artes'],['Éducation musicale','Música'],['Lecture','Lectura']
  ],
  ar:[
    ['Lundi','الاثنين'],['Mardi','الثلاثاء'],['Mercredi','الأربعاء'],['Jeudi','الخميس'],['Vendredi','الجمعة'],['Samedi','السبت'],['Dimanche','الأحد'],
    ['janvier','يناير'],['février','فبراير'],['mars','مارس'],['avril','أبريل'],['mai','مايو'],['juin','يونيو'],['juillet','يوليو'],['août','أغسطس'],['septembre','سبتمبر'],['octobre','أكتوبر'],['novembre','نوفمبر'],['décembre','ديسمبر'],
    ['Français','اللغة الفرنسية'],['Mathématiques','الرياضيات'],['Maths','الرياضيات'],['Anglais','اللغة الإنجليزية'],['Sciences','العلوم'],['Histoire','التاريخ'],['Géographie','الجغرافيا'],['EPS','التربية البدنية'],['Éducation physique','التربية البدنية'],['Arts','الفنون'],['Éducation musicale','الموسيقى'],['Lecture','القراءة']
  ]
};
function escapeRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function translateScheduleText(text,lang){
  if(!text||lang==='fr')return text;
  let out=String(text);
  const exact=EXACT[out.trim()]?.[lang];
  if(exact){
    const pre=out.match(/^\s*/)?.[0]||'',post=out.match(/\s*$/)?.[0]||'';
    return pre+exact+post;
  }
  (SCHEDULE_REPLACEMENTS[lang]||[]).slice().sort((a,b)=>b[0].length-a[0].length).forEach(([fr,tr])=>{
    out=out.replace(new RegExp(escapeRe(fr),'gi'),tr);
  });
  if(lang==='en')out=out.replace(/Période\s+(\d+)/gi,'Term $1').replace(/^Prochain\s*:/i,'Next:');
  if(lang==='es')out=out.replace(/Période\s+(\d+)/gi,'Periodo $1').replace(/^Prochain\s*:/i,'Próximo:');
  if(lang==='ar')out=out.replace(/Période\s+(\d+)/gi,'الفترة $1').replace(/^Prochain\s*:/i,'التالي:');
  return out;
}
function translateText(text,lang){
  if(!text||lang==='fr')return text;
  const raw=String(text),trim=raw.trim();
  if(!trim)return raw;

  // 1. Correspondance exacte normale.
  let translated=EXACT[trim]?.[lang];

  // 2. De nombreux titres/boutons portent une icône ou une flèche dans le même nœud texte
  //    (ex. « ← Accueil Parents », « 📣 Infos de la classe »). On traduit le cœur du texte
  //    tout en conservant la décoration telle quelle.
  if(!translated){
    const m=trim.match(/^([\s←→›•·⚡📚📣📌📅✏️🔄📱📎🗓️🎒🏫☎🧪🌐👨‍👩‍👧]*)?(.*?)([\s←→›•·]*)$/u);
    if(m){
      const lead=m[1]||'', core=(m[2]||'').trim(), tail=m[3]||'';
      const coreExact=EXACT[core]?.[lang];
      if(coreExact)translated=lead+coreExact+tail;
    }
  }

  // 3. Aucun remplacement lexical générique : une chaîne non répertoriée reste en français.
  // Cela empêche les phrases hybrides français/espagnol/anglais/arabe.
  if(!translated)translated=trim;

  const prefix=raw.match(/^\s*/)?.[0]||'',suffix=raw.match(/\s*$/)?.[0]||'';
  return prefix+translated+suffix;
}
const HOMEWORK_FIXED={
  fr:{title:'Devoirs',hello:'Bonjour,',p1:'À la maison, les devoirs restent <strong>courts et simples</strong> : quelques minutes de lecture, de mémorisation ou un petit entraînement oral pour revoir tranquillement ce qui a été travaillé en classe.',p2:'L’objectif n’est pas de refaire la journée d’école, mais d’installer une <strong>petite routine régulière</strong>, sans pression, et de partager parfois un petit défi en famille.',how:'Ils se dérouleront ainsi :'},
  es:{title:'Deberes',hello:'Hola,',p1:'En casa, los deberes siguen siendo <strong>breves y sencillos</strong>: unos minutos de lectura, memorización o un pequeño ejercicio oral para repasar tranquilamente lo trabajado en clase.',p2:'El objetivo no es repetir la jornada escolar, sino establecer una <strong>pequeña rutina regular</strong>, sin presión, y compartir de vez en cuando un pequeño reto en familia.',how:'Se organizarán así:'},
  en:{title:'Homework',hello:'Hello,',p1:'At home, homework remains <strong>short and simple</strong>: a few minutes of reading, memorising or a short oral activity to calmly review what was done in class.',p2:'The aim is not to repeat the school day, but to establish a <strong>small regular routine</strong>, without pressure, and sometimes share a little family challenge.',how:'It will be organised like this:'},
  ar:{title:'الواجبات المنزلية',hello:'مرحبًا،',p1:'في المنزل، تبقى الواجبات <strong>قصيرة وبسيطة</strong>: بضع دقائق من القراءة أو الحفظ أو نشاط شفهي قصير لمراجعة ما تم تعلمه في الصف بهدوء.',p2:'الهدف ليس إعادة اليوم الدراسي، بل إنشاء <strong>روتين بسيط ومنتظم</strong> دون ضغط، ومشاركة تحدٍّ عائلي صغير من حين إلى آخر.',how:'وتنظَّم على النحو التالي:'}
};
function applyHomeworkFixed(lang){
  const t=HOMEWORK_FIXED[lang]||HOMEWORK_FIXED.fr;
  const title=document.getElementById('homeworkTitleLabel');
  const hello=document.getElementById('homeworkIntroHello');
  const p1=document.getElementById('homeworkIntroP1');
  const p2=document.getElementById('homeworkIntroP2');
  const how=document.getElementById('homeworkIntroHow');
  if(title)title.textContent=t.title;
  if(hello)hello.innerHTML='<strong>'+t.hello+'</strong>';
  if(p1)p1.innerHTML=t.p1;
  if(p2)p2.innerHTML=t.p2;
  if(how)how.textContent=t.how;
}

let current='fr';
const originals=new WeakMap();
let observer=null;
let applying=false;
let refreshQueued=false;

const OBSERVER_OPTIONS={childList:true,subtree:true};

function observeBody(){
  if(observer&&document.body)observer.observe(document.body,OBSERVER_OPTIONS);
}

function withObserverPaused(fn){
  const shouldResume=!!observer;
  if(observer)observer.disconnect();
  applying=true;
  try{return fn()}
  finally{
    applying=false;
    if(shouldResume)observeBody();
  }
}

function translateNode(root=document.body){
  if(!root)return;
  withObserverPaused(()=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      if(!node.parentElement)return NodeFilter.FILTER_REJECT;
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement.tagName))return NodeFilter.FILTER_REJECT;
      // V35.20 : les pages pédagogiques dynamiques restent volontairement en français.
      if(node.parentElement.closest('#parentsViewHomework,#parentsViewLearning'))return NodeFilter.FILTER_REJECT;
      // Dans l'emploi du temps, le rendu dynamique est géré explicitement par parents.js :
      // on évite de retraduire les descriptions pédagogiques détaillées.
      if(node.parentElement.closest('#parentsScheduleToday,#parentsScheduleWeek'))return NodeFilter.FILTER_REJECT;
      if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      if(!originals.has(node))originals.set(node,node.nodeValue);
      const original=originals.get(node);
      const translated=translateText(original,current);
      if(node.nodeValue!==translated)node.nodeValue=translated;
    });

    const scope=root.nodeType===1?root:document.body;
    if(scope&&scope.querySelectorAll){
      const labelled=[];
      if(scope.matches&&scope.matches('[aria-label]'))labelled.push(scope);
      scope.querySelectorAll('[aria-label]').forEach(el=>labelled.push(el));
      labelled.forEach(el=>{
        if(el.closest('#parentsViewHomework,#parentsViewLearning'))return;
        if(!el.dataset.i18nAriaOriginal)el.dataset.i18nAriaOriginal=el.getAttribute('aria-label')||'';
        const translated=translateText(el.dataset.i18nAriaOriginal,current);
        if(el.getAttribute('aria-label')!==translated)el.setAttribute('aria-label',translated);
      });
    }
  });
}

function refreshDynamicContent(){
  if(refreshQueued)return;
  refreshQueued=true;
  requestAnimationFrame(()=>{
    refreshQueued=false;
    if(!applying)translateNode(document.body);
  });
}

function applyLang(lang,{persist=true}={}){
  if(!LANGS.includes(lang))lang='fr';
  if(current===lang&&document.documentElement.lang===lang){
    const menu=document.getElementById('parentsLanguageMenu');
    if(menu)menu.hidden=true;
    return;
  }
  current=lang;
  const meta=META[lang];
  document.documentElement.lang=lang;
  document.documentElement.dir=meta.dir;
  document.body?.classList.toggle('parents-rtl',meta.dir==='rtl');
  applyHomeworkFixed(lang);
  if(persist)try{localStorage.setItem('parentsLanguage',lang)}catch(e){}
  const btn=document.getElementById('parentsLanguageButton');
  if(btn){btn.textContent='🌐';btn.title=`${meta.flag} ${meta.label}`;btn.setAttribute('aria-label',`Langue : ${meta.label}`)}
  document.querySelectorAll('[data-lang-choice]').forEach(b=>b.setAttribute('aria-current',b.dataset.langChoice===lang?'true':'false'));
  translateNode(document.body);
  window.dispatchEvent(new CustomEvent('parentslanguagechange',{detail:{lang}}));
}

function setupMenu(){
  const btn=document.getElementById('parentsLanguageButton'),menu=document.getElementById('parentsLanguageMenu');
  if(!btn||!menu)return;
  const close=()=>{menu.hidden=true;btn.setAttribute('aria-expanded','false')};
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    const opening=menu.hidden;
    menu.hidden=!opening;
    btn.setAttribute('aria-expanded',opening?'true':'false');
  });
  menu.addEventListener('click',e=>e.stopPropagation());
  menu.querySelectorAll('[data-lang-choice]').forEach(b=>b.addEventListener('click',()=>{
    close();
    requestAnimationFrame(()=>applyLang(b.dataset.langChoice));
  }));
  document.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  window.addEventListener('resize',close);
  window.addEventListener('scroll',close,{passive:true});
}

function init(){
  let saved='fr';try{saved=localStorage.getItem('parentsLanguage')||'fr'}catch(e){}
  if(!LANGS.includes(saved))saved='fr';
  setupMenu();

  observer=new MutationObserver(muts=>{
    if(applying)return;
    for(const m of muts){
      if(m.type==='childList'&&m.addedNodes.length){refreshDynamicContent();break}
    }
  });

  applyLang(saved,{persist:false});
  observeBody();
}

window.PARENTS_I18N={langs:LANGS,meta:META,get lang(){return current},setLanguage:applyLang,translate:translateText,translateSchedule:translateScheduleText,refresh:refreshDynamicContent};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
