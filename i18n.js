// V34.94 — Couche multilingue Espace Parents (FR / AR / ES / EN)
// V35.01 - audit espagnol : devoirs + évaluations + vacances
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
  'Directeur : Gilles Maigron':{ar:'المدير: Gilles Maigron',es:'Director: Gilles Maigron',en:'Headteacher: Gilles Maigron'}
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
  'Progressions CE2 · Espace Parents · V34.99':{ar:'Progressions CE2 · فضاء أولياء الأمور · V34.98',es:'Progressions CE2 · Espacio para familias · V34.98',en:'Progressions CE2 · Parent Space · V34.98'}
});



// V34.99 — chaînes dynamiques encore produites par parents.js et les données publiques.
Object.assign(EXACT,{
  'Prochain jour de classe':{ar:'اليوم الدراسي القادم',es:'Próximo día de clase',en:'Next school day'},
  'Prochain jour de classe :':{ar:'اليوم الدراسي القادم:',es:'Próximo día de clase:',en:'Next school day:'},
  'Prochain :':{ar:'التالي:',es:'Próximo:',en:'Next:'},
  'Pas de classe aujourd’hui.':{ar:'لا توجد دراسة اليوم.',es:'Hoy no hay clase.',en:'There is no school today.'},
  'Voici l’emploi du temps réel de':{ar:'هذا هو الجدول الدراسي الفعلي ليوم',es:'Este es el horario real de',en:'Here is the actual timetable for'},
  'Période 1':{ar:'الفترة 1',es:'Periodo 1',en:'Term 1'},
  'Voir toute la semaine':{ar:'عرض الأسبوع كاملًا',es:'Ver toda la semana',en:'View the whole week'},
  'Voir l’essentiel':{ar:'عرض الأساسيات',es:'Ver lo esencial',en:'View key learning'},
  'Ce sont les principaux apprentissages travaillés en classe.':{ar:'هذه هي أهم التعلمات التي يتم العمل عليها في الصف.',es:'Estos son los principales aprendizajes trabajados en clase.',en:'These are the main learning goals worked on in class.'},
  'D’autres compétences sont également travaillées au quotidien.':{ar:'كما يتم العمل يوميًا على مهارات أخرى.',es:'También se trabajan otras competencias a diario.',en:'Other skills are also practised every day.'},
  '5 apprentissages importants pour cette période.':{ar:'5 تعلمات مهمة لهذه الفترة.',es:'5 aprendizajes importantes para este periodo.',en:'5 important learning goals for this term.'},

  'Comprendre un texte court et retrouver les informations importantes.':{ar:'فهم نص قصير والعثور على المعلومات المهمة.',es:'Comprender un texto corto y encontrar la información importante.',en:'Understand a short text and find the important information.'},
  'Lire à voix haute avec de plus en plus de fluidité.':{ar:'القراءة بصوت مرتفع بطلاقة متزايدة.',es:'Leer en voz alta con cada vez más fluidez.',en:'Read aloud with increasing fluency.'},
  'Écrire et copier quelques phrases correctes, puis se relire.':{ar:'كتابة ونسخ بعض الجمل الصحيحة ثم مراجعتها.',es:'Escribir y copiar algunas frases correctas y después revisarlas.',en:'Write and copy a few correct sentences, then check them.'},
  'Repérer le verbe et le sujet dans une phrase simple.':{ar:'تحديد الفعل والفاعل في جملة بسيطة.',es:'Identificar el verbo y el sujeto en una frase sencilla.',en:'Identify the verb and subject in a simple sentence.'},
  'Commencer à conjuguer au présent et enrichir son vocabulaire.':{ar:'البدء في تصريف الأفعال في المضارع وإثراء المفردات.',es:'Empezar a conjugar en presente y ampliar el vocabulario.',en:'Begin to use the present tense and expand vocabulary.'},
  'Lire, écrire, décomposer et comparer les nombres.':{ar:'قراءة الأعداد وكتابتها وتفكيكها ومقارنتها.',es:'Leer, escribir, descomponer y comparar números.',en:'Read, write, partition and compare numbers.'},
  'Calculer mentalement avec des stratégies simples.':{ar:'الحساب ذهنيًا باستخدام استراتيجيات بسيطة.',es:'Calcular mentalmente con estrategias sencillas.',en:'Calculate mentally using simple strategies.'},
  'Poser et calculer des additions et des soustractions.':{ar:'إجراء عمليات الجمع والطرح عموديًا.',es:'Plantear y calcular sumas y restas.',en:'Set out and calculate additions and subtractions.'},
  'Résoudre un problème simple et expliquer sa démarche.':{ar:'حل مسألة بسيطة وشرح طريقة الحل.',es:'Resolver un problema sencillo y explicar el procedimiento.',en:'Solve a simple problem and explain the method.'},
  'Utiliser les premiers outils et repères de géométrie.':{ar:'استخدام الأدوات والمفاهيم الأولى في الهندسة.',es:'Utilizar las primeras herramientas y referencias de geometría.',en:'Use the first geometry tools and ideas.'},
  'Comprendre et utiliser quelques salutations courantes.':{ar:'فهم واستخدام بعض عبارات التحية الشائعة.',es:'Comprender y utilizar algunos saludos habituales.',en:'Understand and use some common greetings.'},
  'Demander et dire son prénom.':{ar:'السؤال عن الاسم الأول وقوله.',es:'Preguntar y decir el nombre.',en:'Ask and say your first name.'},
  'Comprendre et dire le temps qu’il fait.':{ar:'فهم حالة الطقس والتحدث عنها.',es:'Comprender y decir qué tiempo hace.',en:'Understand and say what the weather is like.'},
  'Oser prendre la parole avec des expressions très simples.':{ar:'التجرؤ على التحدث باستخدام عبارات بسيطة جدًا.',es:'Atreverse a hablar con expresiones muy sencillas.',en:'Have the confidence to speak using very simple expressions.'},
  'Découvrir quelques repères culturels liés à l’Angleterre et à Halloween.':{ar:'اكتشاف بعض المعالم الثقافية المرتبطة بإنجلترا وهالوين.',es:'Descubrir algunas referencias culturales relacionadas con Inglaterra y Halloween.',en:'Discover some cultural references linked to England and Halloween.'},
  'Se poser une question que l’on peut étudier.':{ar:'طرح سؤال يمكن دراسته.',es:'Plantearse una pregunta que se pueda estudiar.',en:'Ask a question that can be investigated.'},
  'Réaliser une expérience simple en respectant les consignes.':{ar:'إجراء تجربة بسيطة مع احترام التعليمات.',es:'Realizar un experimento sencillo respetando las instrucciones.',en:'Carry out a simple experiment while following instructions.'},
  'Observer et garder une trace des résultats.':{ar:'الملاحظة والاحتفاظ بسجل للنتائج.',es:'Observar y conservar un registro de los resultados.',en:'Observe and keep a record of the results.'},
  'Comparer ce que l’on observe.':{ar:'مقارنة ما تتم ملاحظته.',es:'Comparar lo que se observa.',en:'Compare what is observed.'},
  'Tirer une conclusion simple à partir des résultats.':{ar:'استخلاص نتيجة بسيطة من النتائج.',es:'Sacar una conclusión sencilla a partir de los resultados.',en:'Draw a simple conclusion from the results.'},

  'Accueil, présentation de la classe et premiers échanges.':{ar:'استقبال وتقديم الصف وأولى المحادثات.',es:'Acogida, presentación de la clase y primeros intercambios.',en:'Welcome, class introduction and first conversations.'},
  'Lecture-compréhension : découvrir un texte court et échanger sur ce qui a été compris.':{ar:'قراءة وفهم: اكتشاف نص قصير ومناقشة ما تم فهمه.',es:'Lectura y comprensión: descubrir un texto corto y comentar lo comprendido.',en:'Reading comprehension: discover a short text and discuss what was understood.'},
  'Découverte du cahier, copie courte et écriture du prénom / d’une phrase de rentrée.':{ar:'التعرف إلى الدفتر ونسخ قصير وكتابة الاسم الأول أو جملة عن بداية السنة.',es:'Descubrir el cuaderno, copia breve y escritura del nombre / de una frase de inicio de curso.',en:'Discover the notebook, short copying task and writing a first name / back-to-school sentence.'},
  'Calcul mental : petits calculs connus et compléments simples.':{ar:'حساب ذهني: عمليات بسيطة معروفة ومكملات عددية بسيطة.',es:'Cálculo mental: pequeños cálculos conocidos y complementos sencillos.',en:'Mental maths: familiar calculations and simple number complements.'},
  'Jeux de nombres : lire, écrire et comparer des nombres selon les acquis de la classe.':{ar:'ألعاب الأعداد: قراءة الأعداد وكتابتها ومقارنتها حسب مكتسبات الصف.',es:'Juegos de números: leer, escribir y comparar números según lo aprendido en clase.',en:'Number games: read, write and compare numbers using prior class knowledge.'},
  "Quart d’heure de lecture":{ar:'ربع ساعة قراءة',es:'Cuarto de hora de lectura',en:'Fifteen minutes of reading'},
  'Lecture offerte ou lecture autonome : installer le rituel.':{ar:'قراءة يقدمها المعلم أو قراءة مستقلة: تثبيت الروتين.',es:'Lectura compartida o autónoma: establecer la rutina.',en:'Read-aloud or independent reading: establish the routine.'},
  'Saluer et se présenter : première prise de contact orale.':{ar:'التحية والتعريف بالنفس: أول تواصل شفهي.',es:'Saludar y presentarse: primer contacto oral.',en:'Greet and introduce yourself: first oral interaction.'},
  'Vie de classe / Arts':{ar:'حياة الصف / الفنون',es:'Vida de clase / Artes',en:'Class life / Arts'},
  'Découvrir les espaces, construire les règles de vie et réaliser une première production collective.':{ar:'اكتشاف الأماكن ووضع قواعد الحياة الصفية وإنجاز أول عمل جماعي.',es:'Descubrir los espacios, construir las normas de convivencia y realizar una primera producción colectiva.',en:'Discover the spaces, establish class rules and create a first group piece.'},
  'Ateliers de rentrée':{ar:'ورشات بداية السنة',es:'Talleres de inicio de curso',en:'Back-to-school workshops'},
  'Découverte des outils de la classe, jeux de lecture et de Mathématiques.':{ar:'اكتشاف أدوات الصف وألعاب القراءة والرياضيات.',es:'Descubrir las herramientas de clase y realizar juegos de lectura y matemáticas.',en:'Discover classroom tools and play reading and maths games.'},
  'Bilan de journée':{ar:'حصيلة اليوم',es:'Balance del día',en:'End-of-day review'},
  'Dire ce que l’on a découvert et préparer le lendemain.':{ar:'التعبير عما تم اكتشافه والاستعداد لليوم التالي.',es:'Decir lo que se ha descubierto y preparar el día siguiente.',en:'Say what was discovered and prepare for the next day.'},
  'Français':{ar:'اللغة الفرنسية',es:'Francés',en:'French'},
  'Mathématiques':{ar:'الرياضيات',es:'Matemáticas',en:'Mathematics'},
  'Anglais':{ar:'اللغة الإنجليزية',es:'Inglés',en:'English'},
  'Sciences — questionner le monde du vivant, de la matière et des objets':{ar:'العلوم — استكشاف عالم الكائنات الحية والمادة والأشياء',es:'Ciencias — explorar el mundo de los seres vivos, la materia y los objetos',en:'Science — exploring living things, materials and objects'}
});


// V35.00 — audit espagnol complet : traductions exactes P1→P5 + EMC et messages dynamiques.
Object.assign(EXACT,{
  'Comprendre un texte court et retrouver les informations importantes.':{es:'Comprender un texto corto y encontrar la información importante.'},
  'Lire à voix haute avec de plus en plus de fluidité.':{es:'Leer en voz alta con cada vez más fluidez.'},
  'Écrire et copier quelques phrases correctes, puis se relire.':{es:'Escribir y copiar algunas frases correctas y después releerse.'},
  'Repérer le verbe et le sujet dans une phrase simple.':{es:'Identificar el verbo y el sujeto en una frase sencilla.'},
  'Commencer à conjuguer au présent et enrichir son vocabulaire.':{es:'Empezar a conjugar en presente y ampliar el vocabulario.'},
  'Lire, écrire, décomposer et comparer les nombres.':{es:'Leer, escribir, descomponer y comparar números.'},
  'Calculer mentalement avec des stratégies simples.':{es:'Calcular mentalmente utilizando estrategias sencillas.'},
  'Poser et calculer des additions et des soustractions.':{es:'Plantear y calcular sumas y restas.'},
  'Résoudre un problème simple et expliquer sa démarche.':{es:'Resolver un problema sencillo y explicar el procedimiento.'},
  'Utiliser les premiers outils et repères de géométrie.':{es:'Utilizar las primeras herramientas y nociones de geometría.'},
  'Comprendre et utiliser quelques salutations courantes.':{es:'Comprender y utilizar algunos saludos habituales.'},
  'Demander et dire son prénom.':{es:'Preguntar y decir el nombre.'},
  'Comprendre et dire le temps qu’il fait.':{es:'Comprender y decir qué tiempo hace.'},
  'Oser prendre la parole avec des expressions très simples.':{es:'Atreverse a hablar utilizando expresiones muy sencillas.'},
  'Découvrir quelques repères culturels liés à l’Angleterre et à Halloween.':{es:'Descubrir algunas referencias culturales relacionadas con Inglaterra y Halloween.'},
  'Se poser une question que l’on peut étudier.':{es:'Plantearse una pregunta que se pueda estudiar.'},
  'Réaliser une expérience simple en respectant les consignes.':{es:'Realizar un experimento sencillo respetando las instrucciones.'},
  'Observer et garder une trace des résultats.':{es:'Observar y guardar un registro de los resultados.'},
  'Comparer ce que l’on observe.':{es:'Comparar lo que se observa.'},
  'Tirer une conclusion simple à partir des résultats.':{es:'Sacar una conclusión sencilla a partir de los resultados.'},
  'Ordonner des événements dans le temps.':{es:'Ordenar acontecimientos en el tiempo.'},
  'Utiliser une frise chronologique.':{es:'Utilizar una línea del tiempo.'},
  'Reconnaître les grandes périodes historiques.':{es:'Reconocer los grandes períodos históricos.'},
  'Associer quelques repères historiques à la bonne période.':{es:'Relacionar algunas referencias históricas con el período correspondiente.'},
  'Localiser la France à différentes échelles.':{es:'Localizar Francia a diferentes escalas.'},
  'Lire une carte simple de la population.':{es:'Leer un mapa sencillo de población.'},
  'Localiser Paris et quelques grandes villes françaises.':{es:'Localizar París y algunas grandes ciudades francesas.'},
  'Comparer des espaces plus ou moins peuplés.':{es:'Comparar espacios más o menos poblados.'},
  'Comprendre simplement pourquoi la population est inégalement répartie.':{es:'Comprender de forma sencilla por qué la población está distribuida de manera desigual.'},
  'Coopérer et respecter les règles dans les jeux collectifs.':{es:'Cooperar y respetar las reglas en los juegos colectivos.'},
  'Courir longtemps en apprenant à gérer son allure.':{es:'Correr durante más tiempo aprendiendo a regular el ritmo.'},
  'Agir en sécurité et tenir un rôle simple dans une activité.':{es:'Actuar con seguridad y desempeñar un papel sencillo en una actividad.'},
  'Observer ses résultats et repérer ses progrès.':{es:'Observar los resultados e identificar los progresos.'},
  'Expérimenter différents outils, gestes et matériaux.':{es:'Experimentar con diferentes herramientas, gestos y materiales.'},
  'Réaliser une production en faisant des choix personnels.':{es:'Realizar una producción tomando decisiones personales.'},
  'Observer une œuvre et parler de sa propre production.':{es:'Observar una obra y hablar de la propia producción.'},
  'Mémoriser et interpréter un chant avec le groupe.':{es:'Memorizar e interpretar una canción con el grupo.'},
  'Écouter une musique et en repérer quelques éléments simples.':{es:'Escuchar una música e identificar algunos elementos sencillos.'},
  'Lire avec exactitude et comprendre l’essentiel d’un texte.':{es:'Leer con precisión y comprender lo esencial de un texto.'},
  'Comprendre à qui renvoient les pronoms et les reprises dans un texte.':{es:'Comprender a quién se refieren los pronombres y las referencias en un texto.'},
  'Raconter des événements dans l’ordre et écrire de courts textes.':{es:'Contar acontecimientos en orden y escribir textos breves.'},
  'Reconnaître les noms, les pronoms et le groupe sujet.':{es:'Reconocer los sustantivos, los pronombres y el grupo sujeto.'},
  'Conjuguer au présent les verbes étudiés et consolider les premiers accords.':{es:'Conjugar en presente los verbos estudiados y consolidar las primeras concordancias.'},
  'Comprendre la valeur des chiffres et utiliser différentes écritures d’un nombre.':{es:'Comprender el valor de las cifras y utilizar distintas formas de escribir un número.'},
  'Calculer mentalement avec doubles, moitiés et multiplication par 10 ou 100.':{es:'Calcular mentalmente con dobles, mitades y multiplicaciones por 10 o 100.'},
  'Effectuer additions et soustractions posées, notamment avec retenue ou échange.':{es:'Realizar sumas y restas en columna, especialmente con llevadas o cambios.'},
  'Résoudre des problèmes de multiplication, de groupement ou de partage.':{es:'Resolver problemas de multiplicación, agrupamiento o reparto.'},
  'Mesurer, lire l’heure et reconnaître les principales figures, solides et symétries.':{es:'Medir, leer la hora y reconocer las principales figuras, cuerpos geométricos y simetrías.'},
  'Comprendre et dire les jours de la semaine.':{es:'Comprender y decir los días de la semana.'},
  'Comprendre les mois de l’année et dire une date avec un modèle.':{es:'Comprender los meses del año y decir una fecha siguiendo un modelo.'},
  'Exprimer simplement ce que l’on souhaite au petit-déjeuner.':{es:'Expresar de forma sencilla lo que se desea para el desayuno.'},
  'Prendre part à de très courts échanges oraux.':{es:'Participar en intercambios orales muy breves.'},
  'Découvrir quelques traditions de Thanksgiving et de Christmas.':{es:'Descubrir algunas tradiciones de Thanksgiving y Christmas.'},
  'Reconnaître l’eau sous différents états.':{es:'Reconocer el agua en sus distintos estados.'},
  'Observer et décrire un changement d’état de l’eau.':{es:'Observar y describir un cambio de estado del agua.'},
  'Réaliser une expérience simple sur l’eau.':{es:'Realizar un experimento sencillo sobre el agua.'},
  'Comparer le comportement d’objets dans l’eau.':{es:'Comparar el comportamiento de objetos en el agua.'},
  'Tirer une conclusion à partir d’une expérience.':{es:'Sacar una conclusión a partir de un experimento.'},
  'Comparer les habitats de différentes époques.':{es:'Comparar las viviendas de diferentes épocas.'},
  'Comparer l’alimentation et les objets de la vie quotidienne selon les époques.':{es:'Comparar la alimentación y los objetos de la vida cotidiana según las épocas.'},
  'Repérer ce qui change dans les façons de vivre.':{es:'Identificar lo que cambia en las formas de vida.'},
  'Repérer aussi ce qui reste stable au fil du temps.':{es:'Identificar también lo que permanece estable con el paso del tiempo.'},
  'Reconnaître et décrire un paysage urbain.':{es:'Reconocer y describir un paisaje urbano.'},
  'Comprendre les principales fonctions d’un quartier.':{es:'Comprender las principales funciones de un barrio.'},
  'Utiliser un plan pour localiser un lieu ou suivre un trajet.':{es:'Utilizar un plano para localizar un lugar o seguir un recorrido.'},
  'Comparer centre-ville et périphérie.':{es:'Comparar el centro de la ciudad y la periferia.'},
  'Comprendre comment déplacements et aménagements répondent aux besoins des habitants.':{es:'Comprender cómo los desplazamientos y las infraestructuras responden a las necesidades de los habitantes.'},
  'À la piscine : entrer dans l’eau et s’immerger avec davantage d’aisance.':{es:'En la piscina: entrar en el agua y sumergirse con mayor soltura.'},
  'À la piscine : se déplacer sur une distance adaptée.':{es:'En la piscina: desplazarse una distancia adecuada.'},
  'À la piscine : apprendre à s’équilibrer et à flotter.':{es:'En la piscina: aprender a mantener el equilibrio y a flotar.'},
  'À la piscine : enchaîner plusieurs actions aquatiques.':{es:'En la piscina: encadenar varias acciones acuáticas.'},
  'Lors des sorties piscine du vendredi : respecter les règles de sécurité et gagner en autonomie.':{es:'En las salidas a la piscina de los viernes: respetar las normas de seguridad y ganar autonomía.'},
  'Lire avec plus de fluidité et comprendre l’essentiel, y compris quelques informations implicites.':{es:'Leer con más fluidez y comprender lo esencial, incluidas algunas informaciones implícitas.'},
  'Décrire un personnage ou un lieu dans un texte organisé.':{es:'Describir un personaje o un lugar en un texto organizado.'},
  'Repérer le groupe nominal, le déterminant, le nom et l’adjectif.':{es:'Identificar el grupo nominal, el determinante, el sustantivo y el adjetivo.'},
  'Conjuguer au futur les verbes étudiés.':{es:'Conjugar en futuro los verbos estudiados.'},
  'Enrichir son vocabulaire et consolider les accords dans le groupe nominal.':{es:'Ampliar el vocabulario y consolidar las concordancias dentro del grupo nominal.'},
  'Approfondir la numération et commencer à placer des fractions sur une longueur.':{es:'Profundizar en la numeración y empezar a situar fracciones sobre una longitud.'},
  'Mémoriser les tables de multiplication et trouver des quotients simples.':{es:'Memorizar las tablas de multiplicar y hallar cocientes sencillos.'},
  'Poser une multiplication par un chiffre.':{es:'Plantear una multiplicación por una cifra.'},
  'Résoudre des problèmes à plusieurs étapes, notamment multiplicatifs.':{es:'Resolver problemas de varias etapas, especialmente multiplicativos.'},
  'Utiliser mesures, géométrie, symétrie et représentations de données.':{es:'Utilizar medidas, geometría, simetría y representaciones de datos.'},
  'Demander et dire son âge.':{es:'Preguntar y decir la edad.'},
  'Comprendre une question simple sur l’état ou l’émotion.':{es:'Comprender una pregunta sencilla sobre el estado o la emoción.'},
  'Dire comment on se sent.':{es:'Decir cómo se siente uno.'},
  'Comprendre et donner une consigne simple liée au corps.':{es:'Comprender y dar una instrucción sencilla relacionada con el cuerpo.'},
  'Découvrir quelques repères culturels de Pancake Day.':{es:'Descubrir algunas referencias culturales de Pancake Day.'},
  'Comprendre à quel besoin répond un objet technique.':{es:'Comprender qué necesidad satisface un objeto técnico.'},
  'Identifier les principales parties d’un vélo et leur fonction.':{es:'Identificar las principales partes de una bicicleta y su función.'},
  'Comprendre simplement comment le mouvement est transmis sur un vélo.':{es:'Comprender de forma sencilla cómo se transmite el movimiento en una bicicleta.'},
  'Repérer les éléments indispensables à la sécurité à vélo.':{es:'Identificar los elementos indispensables para la seguridad en bicicleta.'},
  'Tester, régler et améliorer un objet simple.':{es:'Probar, ajustar y mejorar un objeto sencillo.'},
  'Situer quelques figures et événements de l’Antiquité et du début du Moyen Âge.':{es:'Situar algunas figuras y acontecimientos de la Antigüedad y del inicio de la Edad Media.'},
  'Associer un personnage historique à son époque.':{es:'Relacionar un personaje histórico con su época.'},
  'Prélever des informations dans des documents historiques.':{es:'Extraer información de documentos históricos.'},
  'Présenter simplement un personnage ou raconter un événement étudié.':{es:'Presentar de forma sencilla un personaje o contar un acontecimiento estudiado.'},
  'Reconnaître et décrire un espace rural.':{es:'Reconocer y describir un espacio rural.'},
  'Découvrir différentes façons d’habiter le littoral et la montagne.':{es:'Descubrir distintas formas de vivir en el litoral y en la montaña.'},
  'Comparer plusieurs façons de se loger en France.':{es:'Comparar distintas formas de vivienda en Francia.'},
  'Comparer l’accès aux services selon le lieu de vie.':{es:'Comparar el acceso a los servicios según el lugar de residencia.'},
  'Localiser sur la carte de France les principaux espaces étudiés.':{es:'Localizar en el mapa de Francia los principales espacios estudiados.'},
  'Lors des sorties VTT à la Cavayère : maîtriser son vélo dans des situations variées.':{es:'Durante las salidas en bicicleta de montaña a La Cavayère: controlar la bicicleta en situaciones variadas.'},
  'Adapter sa trajectoire au terrain.':{es:'Adaptar la trayectoria al terreno.'},
  'Adapter sa vitesse aux contraintes rencontrées.':{es:'Adaptar la velocidad a las dificultades encontradas.'},
  'Respecter les règles de sécurité et d’organisation pendant les sorties.':{es:'Respetar las normas de seguridad y organización durante las salidas.'},
  'Gagner en autonomie et en confiance à vélo.':{es:'Ganar autonomía y confianza en bicicleta.'},
  'Comprendre l’implicite, les intentions des personnages et les liens de cause à conséquence.':{es:'Comprender lo implícito, las intenciones de los personajes y las relaciones de causa y consecuencia.'},
  'Lire avec expressivité des textes variés, notamment poésie et théâtre.':{es:'Leer con expresividad textos variados, especialmente poesía y teatro.'},
  'Écrire puis améliorer un texte court en utilisant une grille de relecture.':{es:'Escribir y después mejorar un texto breve utilizando una guía de revisión.'},
  'Manipuler les groupes dans la phrase et repérer certains compléments.':{es:'Manipular los grupos de la oración e identificar algunos complementos.'},
  'Conjuguer à l’imparfait et consolider les accords déjà étudiés.':{es:'Conjugar en imperfecto y consolidar las concordancias ya estudiadas.'},
  'Comparer et utiliser des fractions simples.':{es:'Comparar y utilizar fracciones sencillas.'},
  'Choisir une stratégie de calcul efficace et comprendre le sens de la division.':{es:'Elegir una estrategia de cálculo eficaz y comprender el sentido de la división.'},
  'Résoudre des problèmes de périmètre, de durée ou à partir de données.':{es:'Resolver problemas de perímetro, duración o a partir de datos.'},
  'Utiliser monnaie, masses et durées dans des situations concrètes.':{es:'Utilizar dinero, masas y duraciones en situaciones concretas.'},
  'Construire des figures avec règle et compas et poursuivre le travail sur la symétrie.':{es:'Construir figuras con regla y compás y continuar el trabajo sobre la simetría.'},
  'Comprendre et nommer des objets familiers.':{es:'Comprender y nombrar objetos familiares.'},
  'Demander et dire une quantité simple.':{es:'Preguntar y decir una cantidad sencilla.'},
  'Localiser un objet avec une expression connue.':{es:'Localizar un objeto utilizando una expresión conocida.'},
  'Participer à un court échange oral guidé.':{es:'Participar en un breve intercambio oral guiado.'},
  'Associer quelques expressions écrites connues à des images.':{es:'Relacionar algunas expresiones escritas conocidas con imágenes.'},
  'Comprendre le rôle des articulations et des muscles dans le mouvement.':{es:'Comprender el papel de las articulaciones y los músculos en el movimiento.'},
  'Observer les effets d’un effort sur le pouls et la respiration.':{es:'Observar los efectos del esfuerzo sobre el pulso y la respiración.'},
  'Identifier les réactions du corps pendant et après l’effort.':{es:'Identificar las reacciones del cuerpo durante y después del esfuerzo.'},
  'Reconnaître des habitudes favorables à la santé.':{es:'Reconocer hábitos favorables para la salud.'},
  'Expliquer simplement pourquoi une habitude est favorable ou défavorable à la santé.':{es:'Explicar de forma sencilla por qué un hábito es favorable o desfavorable para la salud.'},
  'Situer quelques figures et événements du Moyen Âge.':{es:'Situar algunas figuras y acontecimientos de la Edad Media.'},
  'Décrire quelques aspects de la vie au Moyen Âge.':{es:'Describir algunos aspectos de la vida en la Edad Media.'},
  'Comprendre simplement l’affirmation du pouvoir royal.':{es:'Comprender de forma sencilla el fortalecimiento del poder real.'},
  'Mettre en relation plusieurs documents historiques.':{es:'Relacionar varios documentos históricos.'},
  'Identifier différents lieux et types d’activités professionnelles.':{es:'Identificar distintos lugares y tipos de actividades profesionales.'},
  'Distinguer produire un bien et rendre un service.':{es:'Distinguir entre producir un bien y prestar un servicio.'},
  'Lire un paysage pour comprendre comment on y travaille.':{es:'Leer un paisaje para comprender cómo se trabaja en él.'},
  'Comprendre le rôle des transports et des aménagements dans une activité.':{es:'Comprender el papel de los transportes y las infraestructuras en una actividad.'},
  'Lors des séances à Domec : réaliser et enchaîner plusieurs actions gymniques.':{es:'Durante las sesiones en Domec: realizar y encadenar varias acciones gimnásticas.'},
  'Présenter un petit enchaînement maîtrisé.':{es:'Presentar una pequeña secuencia controlada.'},
  'En lutte : agir efficacement dans une opposition.':{es:'En lucha: actuar eficazmente en una oposición.'},
  'Respecter les règles de sécurité, les rôles et son adversaire.':{es:'Respetar las normas de seguridad, los roles y al adversario.'},
  'Coopérer et gagner en maîtrise de soi pendant les séances.':{es:'Cooperar y ganar autocontrol durante las sesiones.'},
  'Lire de façon autonome, fluide et adaptée au type de texte.':{es:'Leer de forma autónoma, fluida y adecuada al tipo de texto.'},
  'Synthétiser plusieurs informations et vérifier sa compréhension.':{es:'Sintetizar varias informaciones y comprobar la comprensión.'},
  'Planifier, écrire et réviser un texte plus long et organisé.':{es:'Planificar, escribir y revisar un texto más largo y organizado.'},
  'Analyser une phrase simple en réutilisant les classes de mots étudiées.':{es:'Analizar una oración sencilla reutilizando las clases de palabras estudiadas.'},
  'Consolider la conjugaison et les accords, notamment entre le sujet et le verbe.':{es:'Consolidar la conjugación y las concordancias, especialmente entre sujeto y verbo.'},
  'Mobiliser avec autonomie les nombres et les fractions étudiés.':{es:'Utilizar de forma autónoma los números y las fracciones estudiados.'},
  'Choisir une opération, calculer efficacement et vérifier son résultat.':{es:'Elegir una operación, calcular eficazmente y comprobar el resultado.'},
  'Résoudre un problème complexe et expliquer clairement sa démarche.':{es:'Resolver un problema complejo y explicar claramente el procedimiento.'},
  'Convertir et utiliser les mesures et les durées.':{es:'Convertir y utilizar medidas y duraciones.'},
  'Réinvestir géométrie, symétrie, solides et organisation de données.':{es:'Reutilizar conocimientos de geometría, simetría, cuerpos geométricos y organización de datos.'},
  'Demander et dire ce que l’on aime.':{es:'Preguntar y decir lo que gusta.'},
  'Comprendre et décrire très simplement un animal.':{es:'Comprender y describir de forma muy sencilla un animal.'},
  'Suivre le fil d’une histoire courte.':{es:'Seguir el hilo de una historia corta.'},
  'Raconter un court passage avec l’aide d’un modèle.':{es:'Contar un breve fragmento con ayuda de un modelo.'},
  'Réutiliser quelques mots écrits et repères culturels connus.':{es:'Reutilizar algunas palabras escritas y referencias culturales conocidas.'},
  'Ordonner les étapes du cycle de vie d’un être vivant.':{es:'Ordenar las etapas del ciclo de vida de un ser vivo.'},
  'Comparer le développement d’un végétal et d’un animal.':{es:'Comparar el desarrollo de una planta y de un animal.'},
  'Identifier les besoins essentiels des êtres vivants.':{es:'Identificar las necesidades esenciales de los seres vivos.'},
  'Construire et comprendre une chaîne alimentaire simple.':{es:'Construir y comprender una cadena alimentaria sencilla.'},
  'Comprendre quelques relations entre les êtres vivants et leur milieu.':{es:'Comprender algunas relaciones entre los seres vivos y su entorno.'},
  'Situer quelques figures et événements des Temps modernes.':{es:'Situar algunas figuras y acontecimientos de la Edad Moderna.'},
  'Repérer des transformations importantes entre Moyen Âge et Temps modernes.':{es:'Identificar transformaciones importantes entre la Edad Media y la Edad Moderna.'},
  'Croiser des informations sur une grande figure historique.':{es:'Contrastar información sobre una gran figura histórica.'},
  'Expliquer simplement une évolution historique étudiée.':{es:'Explicar de forma sencilla una evolución histórica estudiada.'},
  'Décrire un espace agricole ou touristique.':{es:'Describir un espacio agrícola o turístico.'},
  'Reconstituer le parcours simple d’un produit.':{es:'Reconstruir el recorrido sencillo de un producto.'},
  'Identifier les activités et services d’un territoire.':{es:'Identificar las actividades y servicios de un territorio.'},
  'Repérer les effets d’une activité sur le territoire et l’environnement.':{es:'Identificar los efectos de una actividad sobre el territorio y el medio ambiente.'},
  'Comparer plusieurs espaces de travail en France.':{es:'Comparar varios espacios de trabajo en Francia.'},
  'Réinvestir les habiletés motrices travaillées pendant l’année.':{es:'Reutilizar las habilidades motrices trabajadas durante el año.'},
  'Participer à des jeux collectifs en respectant règles, partenaires et adversaires.':{es:'Participar en juegos colectivos respetando las reglas, a los compañeros y a los adversarios.'},
  'Mesurer ses progrès et chercher à améliorer sa performance.':{es:'Medir los progresos e intentar mejorar el rendimiento.'},
  'Choisir des stratégies adaptées à l’activité proposée.':{es:'Elegir estrategias adaptadas a la actividad propuesta.'},
  'Respecter les règles de la classe et de l’école.':{es:'Respetar las normas de la clase y de la escuela.'},
  'Comprendre ses droits et ses devoirs.':{es:'Comprender sus derechos y sus deberes.'},
  'Prendre une petite responsabilité.':{es:'Asumir una pequeña responsabilidad.'},
  'Coopérer et prendre soin du bien commun.':{es:'Cooperar y cuidar el bien común.'},
  'Exprimer un désaccord sans blesser.':{es:'Expresar un desacuerdo sin hacer daño.'},
  'Distinguer conflit, violence et harcèlement.':{es:'Distinguir entre conflicto, violencia y acoso.'},
  'Savoir demander l’aide d’un adulte.':{es:'Saber pedir ayuda a un adulto.'},
  'Exprimer son ressenti et écouter celui des autres.':{es:'Expresar lo que se siente y escuchar a los demás.'},
  'Utiliser le message clair pour chercher une solution.':{es:'Utilizar el mensaje claro para buscar una solución.'},
  'Comprendre la différence entre intérêt personnel et intérêt général.':{es:'Comprender la diferencia entre interés personal e interés general.'},
  'Participer à une décision collective.':{es:'Participar en una decisión colectiva.'},
  'Proposer une action utile au groupe.':{es:'Proponer una acción útil para el grupo.'},
  'Prendre la parole et écouter lors d’un conseil.':{es:'Tomar la palabra y escuchar durante una asamblea.'},
  'Comprendre les conséquences de ses actes sur les autres.':{es:'Comprender las consecuencias de los propios actos sobre los demás.'},
  'Comprendre que chacun a la même dignité.':{es:'Comprender que todas las personas tienen la misma dignidad.'},
  'Repérer quelques stéréotypes et respecter les différences.':{es:'Identificar algunos estereotipos y respetar las diferencias.'},
  'Comprendre le sens de la devise républicaine.':{es:'Comprender el significado del lema de la República.'},
  'Exprimer un point de vue et écouter celui des autres.':{es:'Expresar un punto de vista y escuchar el de los demás.'},
  'Comprendre le rôle de quelques services rendus à la collectivité.':{es:'Comprender el papel de algunos servicios prestados a la comunidad.'},
  'Connaître quelques missions de la commune.':{es:'Conocer algunas funciones del municipio.'},
  'Savoir alerter un adulte ou un service de secours.':{es:'Saber avisar a un adulto o a un servicio de emergencia.'},
  'Relier un écogeste à l’intérêt général.':{es:'Relacionar un gesto ecológico con el interés general.'},
  'Participer à un projet pour le bien commun.':{es:'Participar en un proyecto para el bien común.'},
  'Rappels des mots du cahier de liaison':{es:'Notas en el cuaderno familia-escuela'},
  'Rappels du cahier de liaison':{es:'Notas en el cuaderno familia-escuela'},
  'Mots, rappels et documents':{es:'Notas, recordatorios y documentos'},
  'Cahier de liaison & informations':{es:'Cuaderno familia-escuela e información'},
  'Prochain jour de classe':{es:'Próximo día de clase'},
  'Prochain jour de classe :':{es:'Próximo día de clase:'},
  'Jour sans classe':{es:'Día sin clase'},
  'Classe · rien à préparer':{es:'Clase · nada que preparar'},
  'Aucun rappel important publié pour le moment.':{es:'No hay ningún aviso importante publicado por el momento.'},
  'Pas de classe prévue ce jour-là.':{es:'No hay clase prevista ese día.'},
  'Aucune information particulière publiée pour cette semaine.':{es:'No hay información especial publicada para esta semana.'},
  'Les projets et moments de vie de classe seront ajoutés ici.':{es:'Los proyectos y momentos de la vida de clase se añadirán aquí.'},
  'Retrouvez ici les informations utiles.':{es:'Aquí encontrará la información útil.'},
  'Aucun document particulier publié.':{es:'No hay ningún documento especial publicado.'},
  'Période 1':{es:'Periodo 1'},
  'Période 2':{es:'Periodo 2'},
  'Période 3':{es:'Periodo 3'},
  'Période 4':{es:'Periodo 4'},
  'Période 5':{es:'Periodo 5'},
  'Période':{es:'Periodo'},
  'Voici les principaux apprentissages travaillés en classe. D’autres compétences sont également exercées au quotidien.':{es:'Estos son los principales aprendizajes trabajados en clase. También se practican otras competencias a diario.'},
  'Voir l’essentiel':{es:'Ver lo esencial'},
  'Grandir ensemble':{es:'Crecer juntos'},
  'Éducation morale et civique':{es:'Educación moral y cívica'},
  'École primaire La Gravette — Carcassonne':{es:'Escuela primaria La Gravette — Carcassonne'},
  'Directeur : Gilles Maigron':{es:'Director: Gilles Maigron'},
  'Progressions CE2 · Espace Parents · V35.00':{es:'Progressions CE2 · Espacio para familias · V35.00'},
  'Progressions CE2 · Espace Parents · V35.01':{es:'Progressions CE2 · Espacio para familias · V35.01'},
  'Pour t’aider :':{es:'Para ayudarte:'},
  'Pour se préparer :':{es:'Para prepararse:'},
  'Nouvelles compétences évaluées':{es:'Nuevas competencias evaluadas'},
  'Déjà vu — rebrassage':{es:'Ya trabajado — repaso'},
  'Cette partie a déjà été travaillée : elle sert seulement à vérifier que l’acquis est bien consolidé.':{es:'Esta parte ya se ha trabajado: solo sirve para comprobar que el aprendizaje está bien consolidado.'},
  'Aucun devoir supplémentaire aujourd’hui. Cette information rappelle simplement l’évaluation prévue.':{es:'Hoy no hay deberes adicionales. Esta información solo recuerda la evaluación prevista.'},
  'Rappels pratiques':{es:'Recordatorios prácticos'},
  'Ne comptent pas comme devoirs':{es:'No cuentan como deberes'},
  'lundi (rappel du week-end)':{es:'lunes (recordatorio del fin de semana)'},
  'Pense à prévoir une tenue adaptée pour l’activité physique.':{es:'Recuerda llevar ropa adecuada para la actividad física.'},
  'Pense à préparer une tenue de sport adaptée pour la séance à Domec.':{es:'Recuerda preparar ropa deportiva adecuada para la sesión en Domec.'},
  'Pense à préparer ton maillot, ta serviette et les affaires demandées pour la piscine.':{es:'Recuerda preparar el bañador, la toalla y el material necesario para la piscina.'},
  'Je découvre les mots de la semaine':{es:'Descubro las palabras de la semana'},
  'Je revois les mots de la semaine':{es:'Repaso las palabras de la semana'},
  'Je commence à préparer ma dictée':{es:'Empiezo a preparar mi dictado'},
  'Mots :':{es:'Palabras:'},
  'Prioritaires :':{es:'Prioritarias:'},
  'Lis, épelle et mémorise les mots. Le cahier n’est pas indispensable : la liste est ici.':{es:'Lee, deletrea y memoriza las palabras. El cuaderno no es indispensable: la lista está aquí.'},
  'Installer le rituel de dictée':{es:'Instalar la rutina del dictado'},
  'Si tu as le petit texte travaillé lundi, relis-le à voix haute pendant quelques minutes. Sans le texte, raconte oralement ce dont tu te souviens : qui ? où ? que se passe-t-il ?':{es:'Si tienes el pequeño texto trabajado el lunes, vuelve a leerlo en voz alta durante unos minutos. Sin el texto, cuenta oralmente lo que recuerdes: ¿quién?, ¿dónde?, ¿qué ocurre?'},
  'Cherche surtout à lire sans hésiter et à respecter les points. Sans cahier ni feuille, le rappel oral suffit.':{es:'Intenta sobre todo leer sin dudar y respetar los puntos. Sin cuaderno ni hoja, basta con recordarlo oralmente.'},
  'Lis les mots affichés ci-dessous, épelle les 5 mots prioritaires puis essaie d’en employer deux oralement dans une phrase.':{es:'Lee las palabras que aparecen abajo, deletrea las 5 palabras prioritarias e intenta utilizar dos de ellas oralmente en una frase.'},
  'Facultatif':{es:'Opcional'},
  'Mes petites révisions — si j’en ai envie':{es:'Mis pequeños repasos — si me apetece'},
  'Deux fiches sont proposées pour réactiver tranquillement quelques notions travaillées en classe :':{es:'Se proponen dos fichas para repasar tranquilamente algunas nociones trabajadas en clase:'},
  'une page de révisions et une page de jeux.':{es:'una página de repaso y una página de juegos.'},
  'Il n’est pas nécessaire de tout faire.':{es:'No es necesario hacerlo todo.'},
  'Votre enfant peut choisir quelques activités, à son rythme et selon ses envies.':{es:'Su hijo/a puede elegir algunas actividades, a su ritmo y según sus ganas.'},
  'L’objectif est simplement de garder quelques acquis en mémoire,':{es:'El objetivo es simplemente mantener algunos aprendizajes en la memoria,'},
  'sans transformer les vacances en temps scolaire':{es:'sin convertir las vacaciones en tiempo escolar'},
  'Lire, jouer, sortir, découvrir et se reposer restent essentiels pendant les vacances.':{es:'Leer, jugar, salir, descubrir y descansar siguen siendo esenciales durante las vacaciones.'},
  'Je vous souhaite de très belles vacances de la Toussaint !':{es:'¡Les deseo unas muy buenas vacaciones de Todos los Santos!'},
  'Je vous souhaite de très belles vacances et un joyeux Noël en famille !':{es:'¡Les deseo unas muy buenas vacaciones y una feliz Navidad en familia!'},
  'Page 1 — Je révise tranquillement':{es:'Página 1 — Repaso tranquilamente'},
  'Page 2 — Je joue et je réfléchis':{es:'Página 2 — Juego y pienso'},
  'Lecture · Français · Mathématiques':{es:'Lectura · Francés · Matemáticas'},
  'Coloriages · code secret · défi logique':{es:'Colorear · código secreto · reto lógico'},
  'Labyrinthe de calcul · code secret · intrus · défi logique':{es:'Laberinto de cálculo · código secreto · intruso · reto lógico'},
  'Observation en situation — 2 nouvelles compétences':{es:'Observación en situación — 2 competencias nuevas'},
  'Petite évaluation — 2 nouvelles compétences':{es:'Pequeña evaluación — 2 competencias nuevas'},
  'observer précisément les résultats d’une expérience':{es:'observar con precisión los resultados de un experimento'},
  'tirer une conclusion à partir des résultats':{es:'sacar una conclusión a partir de los resultados'},
  'localiser la France à différentes échelles':{es:'localizar Francia a diferentes escalas'},
  'lire une carte simple de répartition de la population':{es:'leer un mapa sencillo de distribución de la población'},
  'Aucune fiche à apprendre : réexplique simplement une expérience réellement menée en classe suffit.':{es:'No hay ninguna ficha que aprender: basta con volver a explicar de forma sencilla un experimento realizado realmente en clase.'},
  'Revoir seulement les cartes utilisées en classe et les deux compétences annoncées.':{es:'Repasar únicamente los mapas utilizados en clase y las dos competencias anunciadas.'}
});

const REPLACEMENTS={
  en:[
    ['Lundi','Monday'],['Mardi','Tuesday'],['Mercredi','Wednesday'],['Jeudi','Thursday'],['Vendredi','Friday'],['Samedi','Saturday'],['Dimanche','Sunday'],
    ['janvier','January'],['février','February'],['mars','March'],['avril','April'],['mai','May'],['juin','June'],['juillet','July'],['août','August'],['septembre','September'],['octobre','October'],['novembre','November'],['décembre','December'],
    ['Français','French'],['Mathématiques','Mathematics'],['Maths','Maths'],['Anglais','English'],['Sciences','Science'],['Histoire','History'],['Géographie','Geography'],['Arts','Arts'],['Éducation musicale','Music'],['Lecture','Reading'],['Orthographe','Spelling'],['Grammaire','Grammar'],['Écriture','Writing'],['Numération','Number work'],['Calcul mental','Mental maths'],['Poésie','Poetry'],['EPS','PE'],
    ['Je prépare ma lecture','I prepare my reading'],['Je prépare ma dictée','I prepare my dictation'],['Je prépare les mots de la semaine','I prepare the words of the week'],['Je réactive','I review'],['Je revois','I review'],['Je m’entraîne','I practise'],['Je manipule','I practise'],['Je reformule','I retell in my own words'],['Je mémorise','I memorise'],['Je relis','I reread'],['Je révise','I revise'],
    ['Si tu as','If you have'],['Sans le texte','Without the text'],['Sans cahier','Without the notebook'],['Relis','Reread'],['Lis','Read'],['explique oralement','explain out loud'],['raconte oralement','tell it out loud'],['quelques minutes','a few minutes'],['à voix haute','out loud'],['avec tes mots','in your own words'],['si besoin','if needed'],['en classe','in class'],['à la maison','at home'],['mots prioritaires','priority words'],['mots de la semaine','words of the week'],['dictée','dictation'],['leçon','lesson'],['phrase','sentence'],['verbe','verb'],['sujet','subject'],['nom','noun'],['adjectif','adjective'],['déterminant','determiner'],['présent','present tense'],['futur','future tense'],['problème','problem'],['nombres','numbers'],['addition','addition'],['soustraction','subtraction'],['multiplication','multiplication'],['division','division'],['fractions','fractions'],['géométrie','geometry'],['mesures','measurement'],['heure','time'],['carte','map'],['texte','text'],['personnages','characters'],['histoire','story'],['question','question'],['réponse','answer'],['mots','words'],['évaluation','assessment'],['révision','revision'],['vacances','holiday'],['famille','family'],['classe','class'],['école','school']
  ],
  es:[
    ['Lundi','Lunes'],['Mardi','Martes'],['Mercredi','Miércoles'],['Jeudi','Jueves'],['Vendredi','Viernes'],['Samedi','Sábado'],['Dimanche','Domingo'],
    ['janvier','enero'],['février','febrero'],['mars','marzo'],['avril','abril'],['mai','mayo'],['juin','junio'],['juillet','julio'],['août','agosto'],['septembre','septiembre'],['octobre','octubre'],['novembre','noviembre'],['décembre','diciembre'],
    ['Français','Francés'],['Mathématiques','Matemáticas'],['Maths','Matemáticas'],['Anglais','Inglés'],['Sciences','Ciencias'],['Histoire','Historia'],['Géographie','Geografía'],['Arts','Artes'],['Éducation musicale','Música'],['Lecture','Lectura'],['Orthographe','Ortografía'],['Grammaire','Gramática'],['Écriture','Escritura'],['Numération','Numeración'],['Calcul mental','Cálculo mental'],['Poésie','Poesía'],['EPS','Educación física'],
    ['Je prépare ma lecture','Preparo mi lectura'],['Je prépare ma dictée','Preparo mi dictado'],['Je prépare les mots de la semaine','Preparo las palabras de la semana'],['Je réactive','Repaso'],['Je revois','Repaso'],['Je m’entraîne','Practico'],['Je manipule','Practico'],['Je reformule','Lo explico con mis palabras'],['Je mémorise','Memorizo'],['Je relis','Vuelvo a leer'],['Je révise','Repaso'],
    ['Si tu as','Si tienes'],['Sans le texte','Sin el texto'],['Sans cahier','Sin el cuaderno'],['Relis','Vuelve a leer'],['Lis','Lee'],['explique oralement','explica oralmente'],['raconte oralement','cuenta oralmente'],['quelques minutes','unos minutos'],['à voix haute','en voz alta'],['avec tes mots','con tus palabras'],['si besoin','si es necesario'],['en classe','en clase'],['à la maison','en casa'],['mots prioritaires','palabras prioritarias'],['mots de la semaine','palabras de la semana'],['dictée','dictado'],['leçon','lección'],['phrase','frase'],['verbe','verbo'],['sujet','sujeto'],['nom','nombre'],['adjectif','adjetivo'],['déterminant','determinante'],['présent','presente'],['futur','futuro'],['problème','problema'],['nombres','números'],['addition','suma'],['soustraction','resta'],['multiplication','multiplicación'],['division','división'],['fractions','fracciones'],['géométrie','geometría'],['mesures','medidas'],['heure','hora'],['carte','mapa'],['texte','texto'],['personnages','personajes'],['histoire','historia'],['question','pregunta'],['réponse','respuesta'],['mots','palabras'],['évaluation','evaluación'],['révision','repaso'],['vacances','vacaciones'],['famille','familia'],['classe','clase'],['école','escuela']
  ],
  ar:[
    ['Lundi','الاثنين'],['Mardi','الثلاثاء'],['Mercredi','الأربعاء'],['Jeudi','الخميس'],['Vendredi','الجمعة'],['Samedi','السبت'],['Dimanche','الأحد'],
    ['janvier','يناير'],['février','فبراير'],['mars','مارس'],['avril','أبريل'],['mai','مايو'],['juin','يونيو'],['juillet','يوليو'],['août','أغسطس'],['septembre','سبتمبر'],['octobre','أكتوبر'],['novembre','نوفمبر'],['décembre','ديسمبر'],
    ['Français','اللغة الفرنسية'],['Mathématiques','الرياضيات'],['Maths','الرياضيات'],['Anglais','اللغة الإنجليزية'],['Sciences','العلوم'],['Histoire','التاريخ'],['Géographie','الجغرافيا'],['Arts','الفنون'],['Éducation musicale','الموسيقى'],['Lecture','القراءة'],['Orthographe','الإملاء'],['Grammaire','القواعد'],['Écriture','الكتابة'],['Numération','الأعداد'],['Calcul mental','الحساب الذهني'],['Poésie','الشعر'],['EPS','التربية البدنية'],
    ['Je prépare ma lecture','أحضّر قراءتي'],['Je prépare ma dictée','أحضّر الإملاء'],['Je prépare les mots de la semaine','أحضّر كلمات الأسبوع'],['Je réactive','أراجع'],['Je revois','أراجع'],['Je m’entraîne','أتدرّب'],['Je manipule','أتدرّب'],['Je reformule','أعيد الشرح بكلماتي'],['Je mémorise','أحفظ'],['Je relis','أعيد القراءة'],['Je révise','أراجع'],
    ['Si tu as','إذا كان لديك'],['Sans le texte','من دون النص'],['Sans cahier','من دون الدفتر'],['Relis','أعد القراءة'],['Lis','اقرأ'],['explique oralement','اشرح شفهيًا'],['raconte oralement','احكِ شفهيًا'],['quelques minutes','بضع دقائق'],['à voix haute','بصوت مرتفع'],['avec tes mots','بكلماتك'],['si besoin','عند الحاجة'],['en classe','في الصف'],['à la maison','في المنزل'],['mots prioritaires','الكلمات ذات الأولوية'],['mots de la semaine','كلمات الأسبوع'],['dictée','الإملاء'],['leçon','الدرس'],['phrase','الجملة'],['verbe','الفعل'],['sujet','الفاعل'],['nom','الاسم'],['adjectif','الصفة'],['déterminant','المحدِّد'],['présent','المضارع'],['futur','المستقبل'],['problème','مسألة'],['nombres','الأعداد'],['addition','الجمع'],['soustraction','الطرح'],['multiplication','الضرب'],['division','القسمة'],['fractions','الكسور'],['géométrie','الهندسة'],['mesures','القياس'],['heure','الوقت'],['carte','الخريطة'],['texte','النص'],['personnages','الشخصيات'],['histoire','القصة'],['question','السؤال'],['réponse','الإجابة'],['mots','الكلمات'],['évaluation','التقييم'],['révision','المراجعة'],['vacances','العطلة'],['famille','العائلة'],['classe','الصف'],['école','المدرسة']
  ]
};
function escapeRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function translateFallback(text,lang){
  let out=String(text||'');
  const list=REPLACEMENTS[lang]||[];
  list.slice().sort((a,b)=>b[0].length-a[0].length).forEach(([fr,tr])=>{
    out=out.replace(new RegExp(escapeRe(fr),'gi'),m=>{
      if(m===m.toUpperCase()&&m.length>2)return tr.toUpperCase();
      return tr;
    });
  });
  if(lang==='en'){
    out=out.replace(/(\d+) grand(s?) apprentissage(s?) à retenir pendant cette période\./gi,(_,n)=>`${n} key learning goal${Number(n)>1?'s':''} for this term.`);
    out=out.replace(/Semaine\s+(\d+)/gi,'Week $1');
  }
  if(lang==='es'){
    out=out.replace(/(\d+) grand(s?) apprentissage(s?) à retenir pendant cette période\./gi,(_,n)=>`${n} aprendizaje${Number(n)>1?'s':''} importante${Number(n)>1?'s':''} para este periodo.`);
    out=out.replace(/Semaine\s+(\d+)/gi,'Semana $1');
    out=out.replace(/Cette semaine\s*:\s*(\d+) évaluations? prévues?/gi,(_,n)=>`Esta semana: ${n} evaluación${Number(n)>1?'es':''} prevista${Number(n)>1?'s':''}`);
    out=out.replace(/Évaluations? prévues? cette semaine/gi,'Evaluaciones previstas esta semana');
    out=out.replace(/Aujourd’hui\s*:\s*évaluation de\s+(.+)/gi,'Hoy: evaluación de $1');
    out=out.replace(/Aujourd’hui\s*:\s*bilan oral d[’'](.+)/gi,'Hoy: evaluación oral de $1');
    out=out.replace(/Semaine du\s+(.+)\s+au\s+(.+)/gi,'Semana del $1 al $2');
    out=out.replace(/\bmin environ\b/gi,'min aprox.');
    out=out.replace(/\bEn classe\s*:/gi,'En clase:');
    out=out.replace(/\bPour t[’']aider\s*:/gi,'Para ayudarte:');
    out=out.replace(/\bPour se préparer\s*:/gi,'Para prepararse:');
    out=out.replace(/\brappel du week-end\b/gi,'recordatorio del fin de semana');
    out=out.replace(/\bNouvelles compétences évaluées\b/gi,'Nuevas competencias evaluadas');
    out=out.replace(/Aucun devoir supplémentaire aujourd’hui\. Cette information rappelle simplement l’évaluation prévue\./gi,'Hoy no hay deberes adicionales. Esta información solo recuerda la evaluación prevista.');
  }
  if(lang==='ar'){
    out=out.replace(/(\d+) grand(s?) apprentissage(s?) à retenir pendant cette période\./gi,(_,n)=>`${n} من التعلمات الأساسية لهذه الفترة.`);
    out=out.replace(/Semaine\s+(\d+)/gi,'الأسبوع $1');
  }
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

  // 3. Repli lexical pour les contenus dynamiques venant des données partagées.
  if(!translated)translated=translateFallback(trim,lang);

  const prefix=raw.match(/^\s*/)?.[0]||'',suffix=raw.match(/\s*$/)?.[0]||'';
  return prefix+translated+suffix;
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

window.PARENTS_I18N={langs:LANGS,meta:META,get lang(){return current},setLanguage:applyLang,translate:translateText,refresh:refreshDynamicContent};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
