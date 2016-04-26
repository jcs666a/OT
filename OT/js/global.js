var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0,
    appMenu = $("#appMenu"),
    closeMenuIndex = $("#closeMenuIndex"),
    menuDisplay = $("#menuDisplay"),
    wrapper = $("#wrapper"),
    loadInOverlay = $("#overlay .inner"),
    overlay = $("#overlay"),
    readMesage = $(".MensageHolder"),
    lastLatitude = 0,
    lastLongitude = 0,
    latitude = 0,
    miposicion=[],
    longitude = 0,
    tope=0,
    reportObj = {},
    imagesPlaces  = 'http://10.105.116.207/c4/imgCamps/',
    hostVar = 'http://10.105.116.207',
    expressPhone = 0,
    domicilio = "",
    Pols = JSON.stringify([{"id":1202,"idUsuario":7,"regionTrabajo":"1-4-ts_0022-0","createAt":1461344075846,"accion":"Nuevo","mr":{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"area":"CUAUTITLAN-MORELOS_ts_0022","color":"red","rank":"7","ascii":"71"},"geometry":{"type":"Polygon","coordinates":[[[-99.06452561299994,19.56400075600004],[-99.06448264399995,19.564055662000044],[-99.06439035399995,19.564008011000055],[-99.06431813399996,19.56414228700004],[-99.06442143399994,19.564193687000056],[-99.06439506199996,19.56424157300006],[-99.06436600599994,19.56429421100006],[-99.06430699699996,19.56440119100006],[-99.06427714299997,19.564455354000074],[-99.06424250699996,19.56451839700003],[-99.06420579099995,19.564580403000036],[-99.06418262299997,19.564630436000073],[-99.06415694899994,19.564685858000075],[-99.06412927099996,19.56474550200005],[-99.06409517499998,19.564818978000062],[-99.06407290899995,19.564867125000035],[-99.06405294999996,19.564910242000053],[-99.06403332099995,19.564951371000063],[-99.06413420799998,19.56499057900004],[-99.06411712599999,19.565042180000034],[-99.06408415799996,19.565116585000055],[-99.06406143999999,19.56516789500006],[-99.06402968299994,19.565239332000033],[-99.06399902799996,19.56530843400003],[-99.06397158799996,19.565370348000044],[-99.06393993199998,19.565441515000032],[-99.06390987899994,19.565509270000064],[-99.06387449699997,19.565589156000044],[-99.06384494999998,19.565655651000043],[-99.06381389499995,19.565725561000022],[-99.06378675899998,19.565786665000076],[-99.06375841299996,19.565850646000058],[-99.06373057299999,19.565913367000064],[-99.06370032099994,19.56598148000006],[-99.06366468799996,19.566081845000042],[-99.06364516799994,19.566126783000072],[-99.06362112599999,19.56618187400005],[-99.06359225499995,19.566248020000046],[-99.06356619899998,19.56630778500005],[-99.06353702599995,19.566374650000057],[-99.06350956199998,19.566437651000058],[-99.06347978399998,19.566505954000036],[-99.06345322899995,19.56656670700005],[-99.06342375399998,19.56663429100007],[-99.06339236399998,19.566706370000077],[-99.06334681899995,19.566796391000025],[-99.06322904799998,19.56674199100007],[-99.06317431699995,19.566726064000022],[-99.06315023599996,19.56678296800004],[-99.06311193099998,19.566763554000033],[-99.06303998199996,19.56673025400005],[-99.06297598499998,19.566700643000047],[-99.06290924299998,19.566669801000046],[-99.06284562399998,19.566640379000034],[-99.06281045299994,19.566706040000042],[-99.06268929099997,19.566649307000034],[-99.06265620299996,19.566636248000066],[-99.06268010799994,19.566591939000034],[-99.06262043599997,19.56657020700004],[-99.06249367499998,19.566520344000025],[-99.06253185999998,19.566452386000037],[-99.06239770299999,19.566399661000048],[-99.06231011599999,19.56635998400003],[-99.06218238299994,19.56630647700007],[-99.06211623899998,19.56627890900006],[-99.06204905499999,19.56625077700005],[-99.06197774399999,19.56622782100004],[-99.06200523399997,19.56616364300004],[-99.06196222099999,19.56614531500003],[-99.06189707799996,19.566120123000076],[-99.06183696099998,19.566096841000046],[-99.06185393799996,19.566059014000075],[-99.06179411099998,19.56603555600003],[-99.06171029199999,19.56600293200006],[-99.06167120599997,19.566046220000032],[-99.06163780199995,19.566083184000036],[-99.06158362099995,19.566059564000057],[-99.06150839999998,19.566027288000043],[-99.06144428099998,19.565998943000068],[-99.06138507699995,19.565973231000044],[-99.06137588899998,19.565969246000066],[-99.06134841799997,19.565957293000054],[-99.06128949999999,19.565931677000037],[-99.06125189299996,19.56591535800004],[-99.06121476199996,19.565899138000077],[-99.06113917099998,19.565866311000036],[-99.06106860199998,19.56583557500005],[-99.06101100999996,19.565810529000032],[-99.06092083099998,19.56577134500003],[-99.06088265699998,19.56575474300007],[-99.06078973299998,19.565714327000023],[-99.06075762099994,19.565700381000056],[-99.06061874699998,19.56567130800005],[-99.06057371899999,19.565489710000065],[-99.06042008599997,19.564869784000052],[-99.06037769599999,19.56469884200004],[-99.06010342099995,19.56358280300003],[-99.06003375299997,19.56329831100004],[-99.05985686299994,19.562723885000025],[-99.05984086999996,19.562672004000035],[-99.05995544799998,19.562679306000064],[-99.06003955799997,19.56272045700007],[-99.06002383099997,19.562757945000044],[-99.06009142699997,19.562780195000073],[-99.06018275699995,19.562810247000073],[-99.06020892199996,19.56273661800003],[-99.06027137799998,19.562757771000065],[-99.06039097299998,19.562798342000065],[-99.06045497599996,19.562818709000055],[-99.06048005399998,19.56276436400003],[-99.06052430499994,19.562778456000046],[-99.06068482899997,19.562840849000054],[-99.06081273899997,19.56289046300003],[-99.06084944099996,19.562802628000043],[-99.06093175899997,19.56263483400005],[-99.06096519899995,19.562578476000056],[-99.06110985899994,19.562627237000072],[-99.06157411399994,19.56277954600006],[-99.06151893499998,19.562567752000064],[-99.06157006299998,19.562564486000042],[-99.06163122299995,19.562588060000053],[-99.06167008899996,19.56247090200003],[-99.06174927799998,19.562496457000066],[-99.06170771799998,19.56261882000007],[-99.06175365599995,19.562634486000036],[-99.06183204699994,19.562661567000077],[-99.06190057099997,19.562685103000035],[-99.06196966299996,19.56270892200007],[-99.06203296499996,19.56273072500005],[-99.06209361199996,19.562751570000046],[-99.06213525699997,19.56262078000003],[-99.06227796899998,19.562666783000054],[-99.06223651799996,19.562788604000048],[-99.06229565799998,19.562808333000078],[-99.06236410299994,19.56283114200005],[-99.06245463999994,19.56284921400004],[-99.06253783899996,19.562875028000065],[-99.06261512499998,19.562900184000057],[-99.06269629399998,19.562927047000073],[-99.06274888899998,19.56294438200007],[-99.06280148399998,19.562961717000064],[-99.06291190899998,19.562979813000027],[-99.06301500599994,19.56302731200003],[-99.06297859899996,19.563092677000043],[-99.06309211599995,19.56314463800004],[-99.06314815199994,19.56317092200004],[-99.06317462099997,19.563127388000055],[-99.06321798699997,19.56314264100007],[-99.06329064599998,19.56317396000003],[-99.06335904299999,19.563203384000076],[-99.06343189099994,19.563234798000053],[-99.06350170799999,19.563264883000045],[-99.06360303199995,19.563292681000064],[-99.06367472399995,19.563320084000054],[-99.06375191199999,19.56334976900007],[-99.06381506699995,19.56337401600007],[-99.06388969399995,19.563402745000076],[-99.06384665799999,19.56354927900003],[-99.06384788899999,19.563549846000058],[-99.06383755199994,19.56363882900007],[-99.06394936499998,19.563685681000038],[-99.06409555399995,19.563765556000078],[-99.06418721599994,19.56381573300007],[-99.06437328299995,19.563917409000055],[-99.06452561299994,19.56400075600004]]]}}]},"cliente":[],"noCliente":[{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265387","region":"1-4-ts_0022-0","direccion":"1a. Cda. Lázaro Cárdenas, Hank Gonzalez, 55520 Ecatepec de Morelos, Méx., México","latitud":"19.5514884","longitud":"-99.073279","cliente":"RUIZ OSORIO CATARINO","vivo":false,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"}],"clienteDirigido":[{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340507","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"ARRIAGA CRUZ DOMINGO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340601","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"LARA GUTIERREZ YOLANDA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340615","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"SANCHEZ OCHOA ANTONIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340634","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CERQUEDA NIEVASPEDRO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340652","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340577","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"BARRERA CALDERON FERNANDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340581","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"CONTRERAS HERNANDEZ ISABEL","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340586","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"GALEOTE EUGENIOREYNALDA","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340762","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, Texalpa, 55416 Ciudad de México, Méx., México","latitud":"19.5663448","longitud":"-99.0632861","cliente":"MANZO RODRIGUEZZULEIMA GUADAL","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340835","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"ALFONSO ROJAS BEATRIZ","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340866","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"SILVA GALVAN JORGE LUIS","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340882","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"ESQUIVEL TOVAR MA DE LA LUZ","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340904","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"SIERRA TORRES ANGELICA MARIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340793","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"GRANJA MARTINEZCELINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340799","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"CANDIA ROMERO ISABEL","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340815","region":"1-4-ts_0022-0","direccion":"Agustín Lara, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"MARTINEZ MEJIA BLANCA","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340823","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"PEREZ DE LA CRUZ LEOPOLDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341006","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"ANGELES AYALA BEATRIZ","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341029","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"SANTOS VIVIANO VICTORIA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341070","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"SERRANO DE LA CRUZ SOLEDAD","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341074","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"GARCIA ANGELES MA ISABEL","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341085","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"RIVERA SOSA DOLORES ELIZABETH","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341125","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"PADILLA SERRATOS MARIANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341246","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"GARCIA BARRANCOB MARIA LUISA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341163","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"ORTIZ PERALTA SILVINO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341346","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"LOPEZ PONCE OMAR","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341376","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MARTINEZ SOTO PATRICIA ADELINA","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341266","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"GUTIERREZ LUCIANO GABRIEL RIGO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341285","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"PEREZ DE LA CRUZ EVA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341463","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"CRUZ SANTOS BRENDA LIDIA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341482","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"ORTIZ RODRIGUEZJOSE ANTONIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341424","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"GONZALEZ MEJIA LUIS FERNANDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341556","region":"1-4-ts_0022-0","direccion":"Calle 2, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654483","longitud":"-99.061414","cliente":"VILLALBA GARCIAGUSTAVO ENRIQU","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341569","region":"1-4-ts_0022-0","direccion":"Amado Nervo, Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.565446","longitud":"-99.0579397","cliente":"MORAN MARTINEZ KARINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341593","region":"1-4-ts_0022-0","direccion":"Av Ignacio Manuel Altamirano 2, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5645965","longitud":"-99.0655965","cliente":"CHAVEZ VENTURA BEATRIZ","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341518","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"CANTU BRUNO HECTOR HUGO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341694","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"MU IZ GONZALEZ NORBERTO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341700","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CASTILLO MORENO MARIA DE LOS A","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341706","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"GONZALEZ GOMEZ MARIA VICENTA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341719","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"MARTINEZ MENDEZJUAN JOSE","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341746","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341653","region":"1-4-ts_0022-0","direccion":"Calle 2, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654483","longitud":"-99.061414","cliente":"HERNANDEZ BAUTISTA ANGELA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341661","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"VIZZUET VIZZUETALICIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341863","region":"1-4-ts_0022-0","direccion":"Gardenia Rubén Jaramillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5650005","longitud":"-99.06192370000001","cliente":"MARTINEZ HERNANDEZ JUAN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341751","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"RIOS CHAVEZ AURORA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341754","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"RODRIGUEZ ESPINO VERONICA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341761","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"GARCIA ORTIZ ADRIAN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341776","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"LICONA TELLO ALVARO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341780","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"HERNANDEZ MOSQ UEDA CLAUDIA","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341788","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"CANDIA ROMERO ALEJANDRO","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341943","region":"1-4-ts_0022-0","direccion":"1a. Cda. Lázaro Cárdenas, Hank Gonzalez, 55520 Ecatepec de Morelos, Méx., México","latitud":"19.5514884","longitud":"-99.073279","cliente":"HERNANDEZ ACOSTA GUADALUPE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341945","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"FLORES RESENDIZJOSE","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522341894","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, Texalpa, 55416 Ciudad de México, Méx., México","latitud":"19.5663448","longitud":"-99.0632861","cliente":"HERNANDEZ BAUTISTA DOMINGO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349073","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"CASTILLO ROMEROSERGIO ALBERTO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349084","region":"1-4-ts_0022-0","direccion":"La Virgen, Ecatepec de Morelos, Méx., México","latitud":"19.5648826","longitud":"-99.06488379999999","cliente":"GUZMAN TORRALBAVICTOR HUGO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349094","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"SILVA GALVAN JORGE LUIS","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349250","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MARTINEZ TORRES EDMUNDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349252","region":"1-4-ts_0022-0","direccion":"Cuauhtémoc, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5665926","longitud":"-99.06319599999999","cliente":"ALBARRAS SALAZAR EMILIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349298","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"NUÑEZ GARCIA EDUARDO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349202","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"OROPEZA VALLE CLAUDIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349211","region":"1-4-ts_0022-0","direccion":"De Las Torres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5647055","longitud":"-99.0603946","cliente":"DOMINGUEZ TORRES LAURA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 599","ofertaAdicional":"MOLECULA SM"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349372","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"CORTEZ BOTELLO HECTOR","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349407","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"MARTINEZ SOSA EVERARDO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349474","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"MARTINEZ TREJOESTEBAN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349478","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"RAMIREZ GARCIA FLORA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"MOLECULA CELULAR"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349487","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349491","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"RODRIGUEZ ESPINO J JESUS","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349507","region":"1-4-ts_0022-0","direccion":"Benito Juárez 2da Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"AGUILAR GUERRERO MARIA ELIZABE","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349523","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"LERIN ZUNIGA MARIA EUGENIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349541","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"MARTINEZ SANCHEZ JUANA VERONIC","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349596","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"DE HARO CAMACHO CASIMIRO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349638","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"VARGAS SOLORZANO FRANCISCO FAB","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349663","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"DIAZ GARCIA GESELINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349753","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"FERNANDEZ DIAZ HECTOR","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"MOLECULA SM"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349755","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"ROQUE SANCHEZ CAROLINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349694","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"SANCHEZ PEREZ JUAN LUIS","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349706","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"FUENTES MATA CONCEPCION","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522349792","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260051","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260074","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"CASAS CANO ASCENCION","vivo":true,"producto":"PAQUETE 389","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260002","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"RAMIREZ MORENO JUANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260022","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"HERNANDEZ CHAVEZ GOVANI","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260488","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"DEL ANGEL DEL ANGEL FERMIN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260533","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"TAPIA NAJERA ROSA MIRIAM","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260596","region":"1-4-ts_0022-0","direccion":"Francisco Villa, Benito Juárez Nte Xal, 55340 Ecatepec de Morelos, Méx., México","latitud":"19.546013","longitud":"-99.080981","cliente":"ALFONSO HERRERAALFREDO","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260612","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"BALVER DELGADO JUAN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260565","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"ROMERO ZAVALA POMPEYA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260587","region":"1-4-ts_0022-0","direccion":"Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"ESPINOZA PAREDES ALEJANDRA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551260957","region":"1-4-ts_0022-0","direccion":"Triunfo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5665071","longitud":"-99.062224","cliente":"SANTOS BIBIANO CELIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261082","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"DE SANTIAGO GOMEZ ALEJANDRO","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261109","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"LOPEZ GOMEZ ALVBINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261019","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"MARTINEZ VARGASBELEM","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261044","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"GARCIA LICEA JAIME","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261231","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"ORTEGA FLORES HERMELINDA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261248","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"MENDOZA CHOMPA FELIX","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261156","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"DE SANTIAGO GOMEZ JOSE","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261357","region":"1-4-ts_0022-0","direccion":"De Las Torres, Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5648991","longitud":"-99.06042880000001","cliente":"PEREZ SIERRA ANTONIETA","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261376","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"ROMERO AGUILAR ROCIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261410","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"HERNANDEZ RODRIGUEZ MARIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261710","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"LEDEZMA GARCIA SILVIA","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261593","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"DE LA CRUZ HERNANDEZ MARCELINA","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261741","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"GARCIA HERRERA MIGUEL","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261758","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"LIRA HERNANDEZ PABLO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261955","region":"1-4-ts_0022-0","direccion":"Bugambilias, Ecatepec de Morelos, Méx., México","latitud":"19.5512856","longitud":"-99.06234169999999","cliente":"CHAVEZ RUIZ JOSE RODOLFO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261956","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"MARTINEZ HERNANDEZ GERVACIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262003","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"MONDRAGON SANCHEZ ODILON","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262013","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"ABUNDEZ GUZMAN LETICIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262018","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"MALDONADO HERRERA GUSTAVO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551261888","region":"1-4-ts_0022-0","direccion":"Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"CANALES GARCIA ALICIA","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262091","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262097","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"HERNANDEZ DE LACRUZ JOSE LUIS","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262291","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"REYES CASTILLO BERNARDO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262292","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"ALCALA CORREA EMELIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262304","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"ALCARAZ LOPEZ JOSEFINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262170","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"ANGELES SANCHEZMARIA DE LA LU","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262219","region":"1-4-ts_0022-0","direccion":"Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"LICONA TELLO ELOISA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5558356764","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262331","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"SANCHEZ GUTIERREZ MARIA INES","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262541","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"TREJO RAMIREZ JFRANCISCO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262542","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"JAIMES ALVAREZ REYNALDO","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262554","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"ESPINOSA CASIANO MARIA CATALIN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262569","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"TREJO MALDONADO FILADELFO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262577","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"LOPEZ RODRIGUEZANTONIO","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262588","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"PACHECO GARCIA MARIA CONCEPCIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262590","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"LARA CRUZ MATEO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262595","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CERQUEDA NIEVASJUVENTINO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262599","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"BA UELOS BAUTISTA DIEGO LAUREN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262602","region":"1-4-ts_0022-0","direccion":"Calle 4, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5656457","longitud":"-99.0617876","cliente":"PITAYO ALFARO SILVERIO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262604","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"TAPIA RAMIREZ MINERVA A","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262613","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"GONZALEZ AMBRIZRAFAEL","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262724","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"BELMAN ALVAREZ JOSE ROBERTO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262726","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"JUAREZ HIPOLITO JUANA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262731","region":"1-4-ts_0022-0","direccion":"Calle 4, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5656457","longitud":"-99.0617876","cliente":"MONDRAGON HERRERA JUANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262738","region":"1-4-ts_0022-0","direccion":"Amado Nervo 2, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5637973","longitud":"-99.0641208","cliente":"BONILLA VALDEZMARIA DEL PILAR","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262741","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"CERVANTES BARCENAS MARIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262628","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"GARCIA TORRES FELICITAS","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262631","region":"1-4-ts_0022-0","direccion":"Triunfo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5665071","longitud":"-99.062224","cliente":"PEREZ AVELAR CELESTINO","vivo":true,"producto":"PAQUETE 389","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262644","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262651","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"SANCHEZ NU EZ FLORENCIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262835","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"SAYAGO CANALES SANDRA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262854","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"OROSCO ORTA TERESA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262860","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"RAMIREZ FLORES SUSANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262863","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"MARTINEZ BAUTISTA CLEMENCIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262869","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"REYES CASTRO MARIA LUISA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262903","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"MARTINEZ CANO CLEMENTE","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262774","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"MADRIGAL CEJA JOSE MANUEL","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262798","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643095","longitud":"-99.06337669999999","cliente":"MARTINEZ GOMEZ GAUDENCIA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262813","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"SANCHEZ GUTIERREZ LEOBARDO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262819","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"SIERRA FUENTES RAMON","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262972","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"DELGADO PAREDESOLIVIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262976","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"CALLEJAS PEÑA RAMIRO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262990","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"RAMIREZ HERNANDEZ ANTONIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263010","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"PEDRAZA CORONA ENEDINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263061","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"PADRON DE PONCECARMEN","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262936","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"CRUZ ESCOBAR HUBERTO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262949","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"EFRAIN SOLIS CAMARILLO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262959","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"FLORES AYALA CELIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551262966","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"HERNANDEZ RODRIGUEZ GABRIELA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263303","region":"1-4-ts_0022-0","direccion":"Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"CABRERA FUENTESCONSTANCIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263246","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"TREJO RODRIGUEZ MARIA ROSA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263604","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"LOPEZ ROMERO RAMIRO JULIO","vivo":true,"producto":"DISH HD","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263650","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"BAUTISTA BAUTISTA VICENTE","vivo":true,"producto":"PAQUETE 333","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263863","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5659889","longitud":"-99.0634331","cliente":"SAUCEDO VEGA ELIZABETH","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551263800","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"PEREZ SAN AGUSTIN HERMINIO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264011","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264371","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264271","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"GARCIA VARGAS ANTONIO","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"MOLECULA CELULAR"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264464","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"JOAQUIN HERNANDEZ LETICIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264521","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CASTRO HERNANDEZ JESUS","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264625","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"DOMINGUEZ GOMEZ ROBERTO RAFA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264635","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"BELMAN INFANTE MARIA DEL REFUG","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264541","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"GARCIA VILLEGAS RODRIGO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264578","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"DIAZ CRUZ LETICIA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264833","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"GUZMAN MELO SANTIAGO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551264841","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, Texalpa, 55416 Ciudad de México, Méx., México","latitud":"19.5663448","longitud":"-99.0632861","cliente":"MARTINEZ SOSA CRISTOBALINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"LINEA CREDITO INBURSA"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265009","region":"1-4-ts_0022-0","direccion":"1a. Cda. Lázaro Cárdenas, Hank Gonzalez, 55520 Ecatepec de Morelos, Méx., México","latitud":"19.5514884","longitud":"-99.073279","cliente":"FLORES CRUZ CIPRIANO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265253","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"MONTES DE OCA ALVAREZ BEATRIZ","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265294","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"RODRIGUEZ GREGORIA PORFIRIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265194","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"SEVERIANO HERNANDEZ REINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265227","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643095","longitud":"-99.06337669999999","cliente":"FLORES ESTEVA JUANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265381","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"BALVER GODINEZ JOSE ALFREDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265383","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CESPEDES MARTINEZ OLEGARIO","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265385","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"LARA MIRANDA NORMA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265389","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"LOPEZ RIVERA ELENA CATALINA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265391","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"MARTINEZ SOSA JORGE","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265393","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"MORALES RIOS MARTINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265394","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MENDIETA JIMENEZ MARGARITA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265399","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"SANCHEZ CRISANTO LUCRECIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265401","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"CANALES GONZALEZ REYNA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265402","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"NERIA REBOLLEDOROSA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265403","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"GONZALEZ BERRIOS SALVADOR","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265404","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643095","longitud":"-99.06337669999999","cliente":"GARCIA MARTINEZLUZ MARIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265417","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"MARTINEZ MARTINEZ ISABEL","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"MOLECULA SM"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265423","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"GODINEZ MARTINEZ JOSE ANTONIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265428","region":"1-4-ts_0022-0","direccion":"Gardenia Rubén Jaramillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5650005","longitud":"-99.06192370000001","cliente":"VIZUET VIZUET MAGDALENA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265434","region":"1-4-ts_0022-0","direccion":"La Virgen, Ecatepec de Morelos, Méx., México","latitud":"19.5648826","longitud":"-99.06488379999999","cliente":"GARCIA MENDOZA MARTIN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265467","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CRUZ BADILLO CELIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265451","region":"1-4-ts_0022-0","direccion":"Gardenia Rubén Jaramillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5650005","longitud":"-99.06192370000001","cliente":"MIRANDA BLAS JULIAN","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265452","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"REA MARTINEZ SERAFICA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265454","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"MEDINA GARCIA JORGE MANUEL","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265457","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"MARTINEZ CRUZ RUFINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265320","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"VILLALOBOS RAMIREZ ROSA MARIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265321","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"NAVA BAUTISTA FELIPE DE JESUS","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265323","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"PEREZ RIOS MARGARITO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265325","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"MARTINEZ TREJO ESTEBAN","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265326","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"CHAVEZ SALMERONANA MARIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265327","region":"1-4-ts_0022-0","direccion":"Vicente Coss, Progreso de la Unión, 55117 Ecatepec de Morelos, Méx., México","latitud":"19.5571791","longitud":"-99.0162392","cliente":"VAZQUEZ CAMPOS RAUL","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265332","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"LOPEZ ALVARADO LILIA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265335","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"GRANADOS HERNANDEZ IRMA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265336","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"MARTINEZ CHAVEZLIBORIO","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265337","region":"1-4-ts_0022-0","direccion":"La Virgen, Ecatepec de Morelos, Méx., México","latitud":"19.5648826","longitud":"-99.06488379999999","cliente":"SANTOS MALDONADO FELIPE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265344","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"RUIZ BAUTISTA VIOLETA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265345","region":"1-4-ts_0022-0","direccion":"La Virgen, Ecatepec de Morelos, Méx., México","latitud":"19.5648826","longitud":"-99.06488379999999","cliente":"VALDERRABANO RIOS EDELMIRA","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265346","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"AGUILAR ROJAS BERTHA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265347","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"FLORES REYES SALVADOR","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265349","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"REBOLLEDO CRUZ ISIDRA","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265350","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"ALVA SANCHEZ REFUGIO","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265351","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"ISLAS MORALES JOSE LUIS","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265354","region":"1-4-ts_0022-0","direccion":"Calle 4, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5656457","longitud":"-99.0617876","cliente":"GUZMAN YA EZ MARIA DE LA LUZ","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265355","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643095","longitud":"-99.06337669999999","cliente":"REBOLLEDO CRUZ SALOME","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265356","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"AGUILAR GUERRERO MARIA ELIZABE","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265360","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"ARRIAGA SILVA ROGELIO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265361","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"ROJO GARDU O VICTOR MAYOLO","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265362","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"HERRERA ASCENCION MA DE LOURDE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265364","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"FRAGOSO BLAS SARA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265366","region":"1-4-ts_0022-0","direccion":"Triunfo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5665071","longitud":"-99.062224","cliente":"CASTELAN VITE RICARDO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265367","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"MORALES CORDOVAMARIA DE LOS A","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265368","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639393","longitud":"-99.06066129999999","cliente":"LUNA MURILLO JAVIER","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265371","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, Texalpa, 55416 Ciudad de México, Méx., México","latitud":"19.5663448","longitud":"-99.0632861","cliente":"MARTINEZ TORRESTERESA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265372","region":"1-4-ts_0022-0","direccion":"La Virgen, Ecatepec de Morelos, Méx., México","latitud":"19.5648826","longitud":"-99.06488379999999","cliente":"LOJERO AVENDA OSOFIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265373","region":"1-4-ts_0022-0","direccion":"Guty Cárdenas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5651799","longitud":"-99.062376","cliente":"VILLALOBOS JACUINDE ANTONIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265375","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265377","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"HERRERA BENAVIDES ISAURA","vivo":true,"producto":"PAQUETE 599 VOZ","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265380","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"CASTILLO GONZALEZ CONCEPCION","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265571","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"AGUSTIN HERNANDEZ MARIA GUILLE","vivo":true,"producto":"ACCESORIOS ALTA TECNOLOGIA","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265488","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"GONZALEZ DAMIAN MARICELA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265508","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"GONZALEZ JIMENEZ GLORIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265750","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CERQUEDA NIEVASAMALIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265859","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"CRISTOBAL CRUZ JUVENTINO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265886","region":"1-4-ts_0022-0","direccion":"Texalpa, Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"CALLEJAS PE A EULALIA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551265892","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"AVILA FLORES ARTURO","vivo":true,"producto":"PAQUETE 389","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266215","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"LUJAN NOVA PEDRO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266228","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"MADRIGAL ABUNDOGUADALUPE","vivo":true,"producto":"PAQUETE 389","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266238","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"PALACIOS GRACIDA ELBA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266239","region":"1-4-ts_0022-0","direccion":"Tulpetlac, Ecatepec de Morelos, Méx., México","latitud":"19.5712842","longitud":"-99.0584911","cliente":"DELGADO TORRES SILVIA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"LINEA CREDITO INBURSA"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266267","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"GENARO BERMUDEZJOSEFINA MICAE","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266344","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"PARTIDA MUÑOZ JULIETA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266368","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"PONCE CRUZ MA GRISELDA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266395","region":"1-4-ts_0022-0","direccion":"Triunfo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5665071","longitud":"-99.062224","cliente":"AVELAR TOLENTINO VERONICA","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266274","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"MENDEZ ANGELES MIROSLAVA","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266279","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"MUNOZ SANABRIA SANTIAGO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266280","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"MORA BONILLA MAEPIFANIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266281","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"FLORES REYES DAVID","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266282","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CONTRERAS VAZQUEZ ADRIANA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266285","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"HERNANDEZ DIONISIO LIDIA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266290","region":"1-4-ts_0022-0","direccion":"Guty Cárdenas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5651799","longitud":"-99.062376","cliente":"FLORES ESTEVA CELERINA","vivo":true,"producto":"PAQUETE 333","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266292","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"RUBIO SOLANO RUFINA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266293","region":"1-4-ts_0022-0","direccion":"Guty Cárdenas, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5651799","longitud":"-99.062376","cliente":"REYES CRUZ REYNA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266301","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MIRANDA MARTINEZ PEDRO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266303","region":"1-4-ts_0022-0","direccion":"Felipe Carrillo Puerto, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5649051","longitud":"-99.06378169999999","cliente":"ORTIZ RODRIGUEZ BERTHA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266308","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"DE SANTIAGO MADRIGAL JUAN CARL","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266313","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"GARCIA ORTIZ CRISTINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266319","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"CRUZ DE LA CRUZMANUEL","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266323","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"MOCTEZUMA MARESJAVIER","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266491","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"ACOSTA HERNANDEZ ANTONIA","vivo":true,"producto":"PAQUETE 333","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266496","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"RODRIGUEZ TAPIA YOLANDA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266546","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"GONZALEZ SANCHEZ MANUEL","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266418","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"HERNANDEZ PINACHO SOSIMO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266422","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"LINEA CREDITO INBURSA"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266461","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"GARCIA ORTIZ JAIME","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266660","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MARTINEZ GONZALEZ AMELIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266698","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266719","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"VAZQUEZ HERNANDEZ GUADALUPE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266609","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"GARCIA REYES JUVENTINO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266633","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"DE SANTIAGO GUZMAN JESUS","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266897","region":"1-4-ts_0022-0","direccion":"Macedonio Alcala, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5635802","longitud":"-99.06248910000001","cliente":"ANTUNES AGUI#A JULIANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551266777","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"SANCHEZ MARTINEZ ARTURO","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267172","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"VELAZQUEZ GARCIA DULCE ZULEIMA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267192","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"HERNANDEZ RAMIREZ JUANA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267309","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"RAMIRO CRUZ ANTONIO","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267320","region":"1-4-ts_0022-0","direccion":"La Virgen, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652494","longitud":"-99.06125540000001","cliente":"MORENO DIAZ ZENAIDA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267243","region":"1-4-ts_0022-0","direccion":"Juventino Rosas, Benito Juárez 3ra Secc, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5629514","longitud":"-99.0641375","cliente":"QUINTERO RAMOS FRANCISCO JAVIE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267515","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"VILLANUEVA ROMERO ENEDINA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267396","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"DISH BASICO","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267817","region":"1-4-ts_0022-0","direccion":"ND","latitud":"ND","longitud":"ND","cliente":"ND","vivo":true,"producto":"REVISION CICLO FACTURACION","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267847","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"BAUTISTA BA UELOS VICTORIANO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267720","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"MEDINA SIGUENZA LISBED CELESTE","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267735","region":"1-4-ts_0022-0","direccion":"Álvaro Carrillo, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5639161","longitud":"-99.06240749999999","cliente":"SOTO PEREZ JUANA","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267740","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"SANCHEZ BAEZ TERESA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267895","region":"1-4-ts_0022-0","direccion":"Nuevo León, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5644382","longitud":"-99.0615507","cliente":"PEREZ MAYORGA ROBERTO MICHELLE","vivo":true,"producto":"TV","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5551267939","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"DOMINGUEZ HERNANDEZ RUTH ESTHE","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5557181669","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652727","longitud":"-99.0615602","cliente":"CASTRO PEREZ MAURA OLIVA","vivo":true,"producto":"PAQUETE 333","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340025","region":"1-4-ts_0022-0","direccion":"Calle 4, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5656457","longitud":"-99.0617876","cliente":"GUZMAN YAÑEZ MA GUADALUPE","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340051","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"ESTRADA OROZCO IZBETH","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340062","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"CAMACHO ROJO SENOVIA","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340167","region":"1-4-ts_0022-0","direccion":"Lucio Blanco, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5652929","longitud":"-99.06373909999999","cliente":"ARELLANO CONTRERAS GUADALUPE","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340072","region":"1-4-ts_0022-0","direccion":"Mariano Arista, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5657669","longitud":"-99.0612268","cliente":"BALVER GODINES JUAN JOSE","vivo":true,"producto":"CREDITO HASTA 50,000","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340252","region":"1-4-ts_0022-0","direccion":"Calle 2, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654483","longitud":"-99.061414","cliente":"ALVAREZ MARTINEZ MARTIN","vivo":true,"producto":"PAQUETE 333","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340254","region":"1-4-ts_0022-0","direccion":"Otilio Montaño, La Esperanza, 55300 Ecatepec de Morelos, Méx., México","latitud":"19.5673465","longitud":"-99.0857231","cliente":"PI A ALONSO BEATRIZ","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"MOLECULA LDM 200"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340274","region":"1-4-ts_0022-0","direccion":"Plan de San Luis, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5640289","longitud":"-99.0599027","cliente":"RODRIGUEZ ESPINO ARACELI","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340207","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"REYES MU OZ JOSE DIEGO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340221","region":"1-4-ts_0022-0","direccion":"Ricardo Flores Magón, Texalpa, 55416 Ciudad de México, Méx., México","latitud":"19.5663448","longitud":"-99.0632861","cliente":"RUIZ ROMERO AMADO SILVINO","vivo":true,"producto":"PAQUETE 599","ofertaAdicional":"BICIS"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340383","region":"1-4-ts_0022-0","direccion":"Mil Cumbres, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5643588","longitud":"-99.06046839999999","cliente":"ARELLANO SORIANO CARMEN","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340398","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"GARCIA AVILA YOLANDA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340401","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"BOCANEGRA ROSALES DOMINGO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340403","region":"1-4-ts_0022-0","direccion":"Michoacán, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5645347","longitud":"-99.0611237","cliente":"RIOS CHAVEZ CIRA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340410","region":"1-4-ts_0022-0","direccion":"Av. Francisco Villa, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5654035","longitud":"-99.0618896","cliente":"MIRANDA IGLESIAS ARACELI","vivo":true,"producto":"COMPUTADORA ALTO PERFIL","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340415","region":"1-4-ts_0022-0","direccion":"Flores Magón, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5661811","longitud":"-99.06283839999999","cliente":"LOPEZ HUERTA SOCORRO","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340501","region":"1-4-ts_0022-0","direccion":"Vicente Guerrero, Texalpa, 55416 Ecatepec de Morelos, Méx., México","latitud":"19.5666977","longitud":"-99.06171239999999","cliente":"CARDENAS SALAZAR MARIA FLORA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"},{"id":2,"tcode":"000000001","campaigncode":"CA00000001","offercode":"P00000001","titulo":"Pakteconectes BBB","descripcion":"Campaña pakteconectes Telmex","estado":true,"color":"9900ff","telefono":"5522340504","region":"1-4-ts_0022-0","direccion":"Plan de Ayala, 55418 Ecatepec de Morelos, Méx., México","latitud":"19.5628647","longitud":"-99.0647111","cliente":"NUNEZ GARCIA MATERESA","vivo":true,"producto":"COMPUTADORA CON PAQUETE 389","ofertaAdicional":"NULL"}],"tots":[{"idTecnologia":1,"tecnologiaAcceso":"ATM","totalByArea":1693},{"idTecnologia":2,"tecnologiaAcceso":"FTTH","totalByArea":887},{"idTecnologia":3,"tecnologiaAcceso":"IPDSLAM","totalByArea":36577},{"idTecnologia":5,"tecnologiaAcceso":"TBA","totalByArea":689},{"idTecnologia":7,"tecnologiaAcceso":"VDSL TBA","totalByArea":3}],"totsD":[{"idTecnologia":1,"tecnologiaAcceso":"ATM","totalByArea":1242},{"idTecnologia":2,"tecnologiaAcceso":"FTTH","totalByArea":284},{"idTecnologia":3,"tecnologiaAcceso":"IPDSLAM","totalByArea":3030},{"idTecnologia":5,"tecnologiaAcceso":"TBA","totalByArea":360},{"idTecnologia":7,"tecnologiaAcceso":"VDSL TBA","totalByArea":3}],"tecPoints":{"distritos":[{"poligonos":null,"tecnologias":[{"idTecnologia":1,"tecnologia":"ATM","items":[]}],"centro":{"idDistrito":null,"claveDistrito":null,"idPunto":null,"latitud":"19.56528433","longitud":"-99.06151241","bdLatitud":null,"bdLongitude":null},"idDistrito":20723,"area":{"poligonos":null,"tecnologias":null,"centro":null,"idArea":4,"clave":"METROCUAUTITLAN-MORELOS","descripcion":"CUAUTITLAN-MORELOS"},"claveDistrito":"ts_0022","descripcion":"CUAUTITLAN-MORELOS_ts_0022"},{"poligonos":null,"tecnologias":[{"idTecnologia":3,"tecnologia":"IPDSLAM","items":[]}],"centro":{"idDistrito":null,"claveDistrito":null,"idPunto":null,"latitud":"19.56528433","longitud":"-99.06151241","bdLatitud":null,"bdLongitude":null},"idDistrito":20723,"area":{"poligonos":null,"tecnologias":null,"centro":null,"idArea":4,"clave":"METROCUAUTITLAN-MORELOS","descripcion":"CUAUTITLAN-MORELOS"},"claveDistrito":"ts_0022","descripcion":"CUAUTITLAN-MORELOS_ts_0022"}]},"division":{"poligonos":null,"tecnologias":null,"centro":null,"idDivision":1,"nombre":"METRO","areas":[{"poligonos":null,"tecnologias":null,"centro":null,"idArea":1,"clave":"METROACAPULCO","descripcion":"ACAPULCO"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":2,"clave":"METROBALBUENA","descripcion":"BALBUENA"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":3,"clave":"METROCHILPANCINGO","descripcion":"CHILPANCINGO"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":4,"clave":"METROCUAUTITLAN-MORELOS","descripcion":"CUAUTITLAN-MORELOS"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":5,"clave":"METROERMITA-TLAHUAC","descripcion":"ERMITA-TLAHUAC"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":6,"clave":"METROLINDAVISTA","descripcion":"LINDAVISTA"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":7,"clave":"METROLOMAS","descripcion":"LOMAS"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":8,"clave":"METROMIXCOAC","descripcion":"MIXCOAC"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":9,"clave":"METROMORELOS","descripcion":"MORELOS"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":10,"clave":"METROSATELITE","descripcion":"SATELITE"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":11,"clave":"METROSOTELO","descripcion":"SOTELO"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":12,"clave":"METROTEXCOCO-ZARAGOZA","descripcion":"TEXCOCO-ZARAGOZA"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":13,"clave":"METROTOLUCA","descripcion":"TOLUCA"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":14,"clave":"METROUNIVERSIDAD","descripcion":"UNIVERSIDAD"},{"poligonos":null,"tecnologias":null,"centro":null,"idArea":15,"clave":"METROVALLE-SAN JUAN","descripcion":"VALLE-SAN JUAN"}]},"area":{"poligonos":null,"tecnologias":null,"centro":null,"idArea":4,"clave":"METROCUAUTITLAN-MORELOS","descripcion":"CUAUTITLAN-MORELOS"},"distrito":{"poligonos":null,"tecnologias":null,"centro":null,"idDistrito":20723,"area":{"poligonos":null,"tecnologias":null,"centro":null,"idArea":4,"clave":"METROCUAUTITLAN-MORELOS","descripcion":"CUAUTITLAN-MORELOS"},"claveDistrito":"ts_0022","descripcion":"CUAUTITLAN-MORELOS_ts_0022"}}]);
    urlVars=function(){
      var query_string={};
      var query=window.location.search.substring(1);
      var vars=query.split("&");
      var formulario = $("#formulario");
      for(var i=0;i<vars.length;i++){
        var pair=vars[i].split("=");
        if (typeof query_string[pair[0]]==="undefined")
          query_string[pair[0]]=decodeURIComponent(pair[1]);
        else if (typeof query_string[pair[0]]=== "string"){
          var arr=[query_string[pair[0]],decodeURIComponent(pair[1])];
          query_string[pair[0]]=arr;
        } else
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
      return query_string;
    }();
function global(){
    appMenu.click(function(event){
        iframeMethod("closeIframe");
        appMenu.addClass('active');
        menuDisplay.addClass('active');
        wrapper.addClass('active');
        closeMenuIndex.addClass('open');
    });
      closeMenuIndex.click(function(event) {
        appMenu.removeClass('active');
        wrapper.removeClass('active');
          menuDisplay.removeClass('active');
        closeMenuIndex.removeClass('open');
      });
    formulario.keypress(function(e){
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)){
        loginUser.click();
        return true;
      }
    });
  connect();
  geoRefer();
  core();
  Calendar= JSON.parse(localStorage.getItem('Calendar'));
}
function logout(){
  $.ajax({type:"PUT",
      url:""+hostVar+":9090/telmex/usuario/desconectado",
      data:JSON.stringify({idUsuario:userId}),
      contentType:"application/json",
      dataType:"json",
      success:function(data,a,b){
          window.location = "login.html";
          localStorage.clear();
    }
  });
}
function validar(string){
  for (var i=0, output='', validos="ABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZabcdefghijklmnÃ±opqrstuvwxyz1234567890,. "; i<string.length; i++)
     if (validos.indexOf(string.charAt(i)) != -1)
      output += string.charAt(i)
  return output;
}
function getAllMsg(){
  $.each(fielderMsgs.Todos,function(i,a){
      doneC='';
      if(a.status==true || a.status==null)
        doneC=' done';
      $("<div class='MensageHolder"+doneC+"' data-localId='"+i+"' data-status="+a.status+" data-mensaje="+a.idMensaje+">"+
          "<span class='mailbox'></span>"+
          "<div class='text'>"+
            "<div class='center'>"+
              "<span>"+a.createAt+"</span>"+
            "</div>"+
          "<div id='readit'>"+
            "<i class='fa fa-check'></i>"+
            "<i class='fa fa-check'></i>"+
          "</div>"+
          "<p>"+a.mensaje+"</p>"+
        "</div>"+
      "</div>").appendTo('#content .mensageInner .inner');
  });
}
$(document).on("click","#content .mensageInner .inner .MensageHolder",function(event){
  event.preventDefault();
  var d=$(this),
      clase=$(this).attr('class');
  $(".open").removeClass('open');
  if(!/open/i.test(clase))
    d.addClass("done open");
  var getStatus = d.attr('data-status'),
      getMensajeId = d.attr('data-mensaje').toString(),
      arrSend ={'idMensaje':''+getMensajeId+''};
  if(getStatus=="false"){
    $.ajax({
      type: "PUT",
      url: ""+hostVar+":9090/telmex/msgUp/",
      data: JSON.stringify(arrSend),
      contentType: "application/json",
      dataType: "json",
      success: function(data,a,b){
        d.attr('data-status','true');
        for(var i = 0; i <= fielderMsgs.Todos.length-1; i++){
          if(fielderMsgs.Todos[i].idMensaje == getMensajeId){
            fielderMsgs.Todos[i].status = true;
          }
        }
        fielderMsgs.Nuevos = fielderMsgs.Nuevos-1;
        fielderMsgs = JSON.stringify(fielderMsgs);
        fielderMsgs = localStorage.setItem('fielderMsgs',fielderMsgs);
        fielderMsgs = $.parseJSON(localStorage.getItem('fielderMsgs'));
      },
      error: function(jqXHR,textStatus,error){
        console.log(textStatus, error, jqXHR);
      }
    });
  }
});
//campañas
campanaDone = [];
function getCampanias(){
  if(fielderCamp.length-1 == -1){
    masterAlert('Sin campañas asignadas');
  }
  else{
      for(var i = 0; i <= ObjectSize(fielderCamp)-1; i++){
        if(!campanaDone.includes(fielderCamp[i].campana.id)){
          campanaDone.push(fielderCamp[i].campana.id);
          $("<div class='MensageHolder'>"+
          "<span>"+fielderCamp[i].campana.titulo+"</span>"+
          "<img src='"+imagesPlaces+fielderCamp[i].campana.imagen+"'/>"+
          "<div class='text'>"+
          "<p>"+fielderCamp[i].campana.descripcion+"</p>"+
          "<a onclick='campCrossModul(this);' data-camp='"+fielderCamp[i].campana.id+"'>Contratar</a>"+
          "</div>"+
          "</div>").appendTo('#content .campaniasInner .inner');
          }
        }
  }

    function includes(k) {
      for(var i=0; i < this.length; i++){
        if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
          return true;
        }
      }
      return false;
    }
  campanaDone = [];
}
function geoRefer(){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  }
  else{
    console.log('not support');
  }
}
var positionCounter = 0;
function geo_success(position) {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
    savePosition();
    if($("#map-canvas").length){
      newPosition();
    }
    setTimeout(function(){
      navigator.geolocation.getCurrentPosition(geo_success,geo_error, geo_options);
    }, 60000);
}

function geo_error() {
  masterAlert("Posición no disponible");
    navigator.geolocation.getCurrentPosition(geo_success,geo_error, geo_options);
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 600000,
  timeout           : 600000
};
function getPromise(url,data){ // Actualizar todo lo que venga aqui a getPromesa(data);
  var request=$.ajax({
    method:"POST",
    url:url,
    contentType:"application/json",
    data:JSON.stringify(data),
    processData:false
  });
return request;
}
function getPromesa(data){
  return $.ajax({method:"POST",url:"views/db_functions_c.php",data:data});
}
function connect() {
    var socket = new SockJS(''+hostVar+':8080/messaging');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/'+userId+'/topic/region', function(greeting){
            type = 'mapa';
            socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/usuario', function(greeting){
            type = "usario";
                socketResponse(greeting.body, type);
        });
       stompClient.subscribe('/topic/campaña', function(greeting){
            type = "campanias";
                socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/mensaje', function(greeting){
           var type = 'mensajeria';
                socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/cfr', function(greeting){
           var type = 'cfr';
           socketResponse(greeting.body, type);
        });
       stompClient.subscribe('/topic/dns', function(greeting){
            type = "DNS";
            socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/topic/reporte/campaña', function(greeting){
             type = "reporte";
             socketResponse(greeting.body, type);
         });
    });
  var socketg = new SockJS(''+hostVar+':8080/coordenadas');
    stompClientg = Stomp.over(socketg);
    stompClientg.connect({}, function(frame) {
        console.log('Connected: ' + frame);
  });
  var socketAA = new SockJS(''+hostVar+':8080/contrato');
    stompClientAA = Stomp.over(socketAA);
    stompClientAA.connect({}, function(frame) {
        console.log('Connected: ' + frame);
  });
  socket.onclose = function() {
    setTimeout(function(){
      connect();
    }, 10000);
  };
  socketg.onclose = function() {
    setTimeout(function(){
      connect();
   }, 10000);
  };
 socketAA.onclose = function() {
    setTimeout(function(){
      connect();
    }, 10000);
  };
}
function savePosition(){
  stompClientg.send("/app/coordenadas", {}, JSON.stringify({ 'latitud': latitude, 'longitud': longitude, 'idFielder': userId }));
}
function persistencia(j){
  stompClientAA.send("/app/contrato", {}, JSON.stringify(j));
}
function socketResponse(response, type){
  response = $.parseJSON(response);
  if(type == "mensajeria"){
    Obj = fielderMsgs;
    name = 'fielderMsgs';
    NewContent(type, Obj, response, name);
  }
  if(type == "mapa"){
    Obj = fielderRegs;
    name = 'fielderRegs';
    NewContent(type, Obj, response, name);
  }
  if(type == "campanias"){
    Obj = fielderCamp;
    name = 'fielderCamp';
    NewContent(type,Obj, response, name);
  }
  if(type == "cfr"){
    Obj = fielderCamp;
    name= 'fielderCamp';
    NewContent(type, Obj, response, name);
  }
  if(type == "DNS"){
    printInfoUser(response);
  }
  if(type == "usario"){
    logout();
  }
  if(type == "reporte"){
    Obj = Calendar;
    name='Calendar';
    NewContent(type,Obj,response, name);
  }
}
function NewContent(url, Obj, r, name){
    //$("#brodcast").fadeIn('fast');
    if(url == "mensajeria"){
      if(r.accion == "Nuevo"){
        Obj.Todos.unshift(r);
        Obj.Nuevos = Obj.Nuevos+1;
      }
      if(r.accion == "Alerta"){
        printInfoUser(r);
      }
    }
    if(url== "mapa"){
      if(r[0].accion == "Eliminado"){
        delateItem(r,Obj);
      }
      else{
        styleNode(r, Obj);
      }
    }
    if(url == "campanias"){
    	if(r.accion == "Eliminado"){
    		borraCamp(r);
    	}
    else{
      	Obj[ObjectSize(Obj)] = r;
      }
    }
    if(url == "cfr"){
      commerceCamp(r);
    }
    if(url == "reporte"){
      exReport(r);
    }
    Obj = JSON.stringify(Obj);
    Obj = localStorage.setItem(name,Obj);
    Obj = $.parseJSON(localStorage.getItem(''+name+''));
    //esta linea se va y se genera un cuadro de dialogo
    //$("#brodcast").fadeOut('fast');
    if(window.location.hash == "#"+url){
      location.reload();
    }
    if(window.location.hash == "#home" && url == "mensajeria"){
      location.reload();
    }
    function commerceCamp(r){
      if(r.accion == "Nuevo"){
        fielderCamp.push(r);
        if(window.location.hash == "#campanias"){
          location.reload();
        }
        if(window.location.hash == "#mapa"){
          PutInMapCamp();
        }
      }
      if(window.location.hash == "#calendario" && url == "reporte"){
        location.reload();
      }
      if(r.accion == "Eliminado"){

        for(var c = 0; c <= fielderCamp.length-1; c++){
          if(r.idCr == fielderCamp[c].idCr){
            fielderCamp.splice(c,1);
          }
        }
        $.each(fielderCalendar, function(index, val) {
          $.each(fielderCalendar[index], function(index2, val) {
            $.each(fielderCalendar[index][index2], function(index3, val) {
              if(r.idCr == fielderCalendar[index][index2][index3].idCr){
                delete fielderCalendar[index][index2][index3];
              }
            });
          });
        });
        if(window.location.hash == "#campanias" || window.location.hash == "#calendario"){
          location.reload();
        }
      }
    }
    function borraCamp(r){
		console.log('delete');
		for(var c = 0; c <= fielderCamp.length-1; c++){
			console.log(c);
			if(r.idCampaña == fielderCamp[c].campana.id){
				fielderCamp.splice(c,1);
			}
		}
    }
    function putInMap(){
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
        if(fielderCalendar[y][m][d]){
              color = fielderCalendar[y][m][d].calendario.color,
              size = fielderCalendar[y][m][d].calendario.region;
          for(var i = 0; i <= size.length-1; i++){
            var split = size[i].split('-');
            $.each(fielderPols.Distritos, function(index, val) {
              if(split[2] == index){
                fielderPols.Distritos[index].properties.color = "#"+color;
                var insert = document.getElementById('campaniasAsignadas');
                insert.innerHTML = insert.innerHTML+
                "<div class='row'>"+
                "<div class='color' style='background:#"+color+";'></div>"+
                "<div class='innerRow'>"+
                "<div class='titulo'><p style='color:#"+color+";'>"+fielderCalendar[y][m][d].calendario.titulo+"</p></div>"+
                "<div class='descripcion'><p>"+fielderCalendar[y][m][d].calendario.descripcion+"</p></div>"+
                "</div>"+
                "</div>";
              }
            });
          }
        }
        else{
        	masterAlert('No existe fecha');
        }
    }
    function styleNode(r, Obj){
      console.log(r);
      //response del contenido
      Regiones = {};
      Regiones["Nomenclatura"] = r[0].regionTrabajo,
      Regiones["Llave"]= r[0].distrito.descripcion,
      Regiones["Division"]=r[0].division.idDivision,
      Regiones["Area"] = r[0].area.idArea,
      Regiones["Distrito"] = r[0].distrito.claveDistrito;
      Obj.Region.push(Regiones);
      if(!Obj.Areas[r[0].area.idArea]){
        Obj.Areas[r[0].area.idArea] = {},
        Obj.Areas[r[0].area.idArea].Distritos = {},
        fielderTecs[r[0].area.idArea] = {},
        fielderTecs[r[0].area.idArea]['PorTipo']={},
        fielderTecs[r[0].area.idArea].PorTipo['EnArea']= {};
        fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito] = {};
      }
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito] = {},
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].Clientes = r[0].cliente,
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].clienteDirigido = r[0].clienteDirigido,
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].NoClientes = 0,
      fielderPols.Distritos[r[0].distrito.claveDistrito] = r[0].mr.features[0];
      for(var i = 0; i <= r[0].tecPoints.distritos.length-1; i++){
        if(!fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito]){
          fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito] = {};
        }
        areas = fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito];
        distritos = fielderTecs[r[0].area.idArea].PorTipo;
        distritos['Distritos'] = {},
        distritos.Distritos[r[0].distrito.claveDistrito] = {},
        distritos.Distritos[r[0].distrito.claveDistrito][r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]= r[0].tecPoints.distritos[0].tecnologias[0].idTecnologia,
        distritos['EnArea'] = {},
        distritos.EnArea[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia] = {},
        distritos.EnArea[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]= r[0].tecPoints.distritos[0].tecnologias[0].idTecnologia,
        distritos['AreaName'] = r[0].area.descripcion,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia] = {},
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["idTecnologia"] = r[0].tecPoints.distritos[i].tecnologias[0].idTecnologia,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["centros"] = [],
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0] = {},
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0]["latitud"] = r[0].tecPoints.distritos[i].centro.latitud,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0]["longitud"] = r[0].tecPoints.distritos[i].centro.longitud,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["idDistrito"]= r[0].tecPoints.distritos[i].idDistrito;
        switch(areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].idTecnologia) {
            case 1:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "5FB404";
                break;
            case 2:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FF8000";
                break;
            case 3:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "0080FF";
                break;
            case 4:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "8000FF";
                break;
            case 5:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "B40404";
                break;
            case 6:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FF00FF";
                break;
            case 7:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "01DFD7";
                break;
            case 8:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FFBF00";
                break;
            default:
        }
        switch(areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].idTecnologia) {
            case 1:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiATM.png";
                break;
            case 2:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiFTTH.png";
                break;
            case 3:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiIpDislam.png";
                break;
            case 4:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiND.png";
                break;
            case 5:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiTBA.png";
                break;
            case 6:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiVSDLIPD.png";
                break;
            case 7:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiVSDLTBA.png";
                break;
            case 8:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiWIMAX.png";
                break;
            default:
        }

      }

    }
    function delateItem(r, Obj){
      var parts = r[0].regionTrabajo.split('-', 4);
      for(var i = 0; i <= fielderRegs.Region.length-1; i++){
          if(fielderRegs.Region[i].Nomenclatura == r[0].regionTrabajo){
            console.log('L:562');
            fielderRegs.Region.splice(i,1);
            delete fielderTecs[parts[1]].PorTipo.Distritos[parts[2]];
          }
      }
     if(fielderRegs.Areas[parts[1]].Distritos[parts[2]]){
        delete fielderRegs.Areas[parts[1]].Distritos[parts[2]];
      }
      if(parts[2] != 0){
        if(fielderPols.Distritos[parts[2]]){
          delete fielderPols.Distritos[parts[2]];
        }
      }
      else{
        alert("borra area");
      }
    }
    fielderPols = JSON.stringify(fielderPols);
    fielderPols = localStorage.setItem('fielderPols',fielderPols);
    fielderPols = $.parseJSON(localStorage.getItem('fielderPols'));
    fielderRegs = JSON.stringify(fielderRegs);
    fielderRegs = localStorage.setItem('fielderRegs',fielderRegs);
    fielderRegs = $.parseJSON(localStorage.getItem('fielderRegs'));
    fielderTecs = JSON.stringify(fielderTecs);
    fielderTecs = localStorage.setItem('fielderTecs',fielderTecs);
    fielderTecs = $.parseJSON(localStorage.getItem('fielderTecs'));
}


function ObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
function removeAndSort(obj, key) {
    for (k in obj) {
        if (k==key) {
            delete obj[k];
        }
    }
var keys = Object.keys(obj),
  i, len = keys.length;
  keys.sort();
for(i = 0; i < len; i++){
  k  = keys[i];
  obj[i] = obj[k];
}
obj.pop();
}
//calendario
function calendar(t){
  var hoy = new Date(),data,dataYear;
  if(t == undefined){
    var d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
    calCostruct(d, m, y);
  }
  else{
    if(t.dataset.action){
      data = t.dataset.action;
      getInfoDay(data);
      $(".row").removeClass("activeDay2");
      t.classList.add("activeDay2");
    }
    if(t.dataset.prev){
      data = t.dataset.prev,
      dataYear = t.dataset.year;
      var go = new Date();
      var d = go.getDate(),
          m = parseInt(data)-1,
          y = dataYear;
      if(m<0){
        m=11;y=parseInt(y)-1;
      }
      calCostruct(d, m, y);
      var currentDate = new Date(),
      mm = currentDate.getDate();
      if(m != mm ){
        $('.row').removeClass('activeDay');
      }
    }
    if(t.dataset.next){
      data = t.dataset.next,
      dataYear = t.dataset.year;
      var go = new Date();
      var d = go.getDate(),
          m = parseInt(data)+1,
          y = dataYear;
      if(m>11){
        m=0;y=parseInt(y)+1;
      }
      calCostruct(d, m, y);
      var currentDate = new Date(),
      mm = currentDate.getDate();
      if(m != mm ){
        $('.row').removeClass('activeDay');
      }
    }
  }
  function calCostruct(d, m, y){
      var mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dias =['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        firstDay = new Date(y,m,(1-1)),
        firstDay = firstDay.getDay(),
        monthLength = new Date(y, m+1, 0).getDate(),
        body = '',
        header = '';
      header += '<div class="nav">';
      header += '<p data-prev="'+m+'" data-year="'+y+'" onclick="calendar(this);" style="left:0px;"><i class="fa fa-arrow-left"></i></p>';
      header +=  "<h3>"+mes[m] + "&nbsp;" +y+"</h3>";
      header += '<p data-next="'+m+'" data-year="'+y+'" onclick="calendar(this);" style="right:0px;"><i class="fa fa-arrow-right"></i></p>';
      header += '</div>';
      header += '<div class="header">';
      for(var i = 0; i <= 6; i++ ){
        header += '<div class="row">';
        header += dias[i];
        header += '</div>';
      }
          var day = 1;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j <= 6; j++) {
            if(day <= firstDay){
              body += "<div class='row'>&nbsp;</div>";
              day++;
            }
            if((day <= (monthLength+firstDay)) && (i > 0 || j >= firstDay)){
                if((day-firstDay) == d){
                  body += '<div class="row activeDay" data-action="'+(day-firstDay)+'-'+m+'-'+y+'" onclick="calendar(this);">';
                  if(!Calendar[y]){
                     Calendar[y] = {};
                  }
                  if(!Calendar[y][m]){
                    Calendar[y][m] = {}
                  }
                  if(!Calendar[y][m][(day-firstDay)]){
                    Calendar[y][m][(day-firstDay)] = {}
                  }
                  else{
                    if(Calendar[y][m][(day-firstDay)].campInfo){
                      camps = Calendar[y][m][(day-firstDay)].campInfo;
                      for(var f = 0; f <= camps.length-1; f++){
                        body += '<div class="eventCamp" style="background:#'+camps[f].color+';"></div>';
                      }
                    }
                  }
                  body+= (day-firstDay)+'</div>';
                  data = String((day-firstDay))+'-'+String(m)+'-'+String(y);
                  getInfoDay(data);
                }
                else{
                  body += '<div class="row" data-action="'+(day-firstDay)+'-'+m+'-'+y+'" onclick="calendar(this);">';
                  if(!Calendar[y]){
                    Calendar[y]= {};
                  }
                  if(!Calendar[y][m]){
                    Calendar[y][m] = {};
                  }
                  if(!Calendar[y][m][(day-firstDay)]){
                    //console.log('NaN');
                  }
                  else{
                    if(Calendar[y][m][(day-firstDay)].campInfo){
                      camps = Calendar[y][m][(day-firstDay)].campInfo;
                      for(var f = 0; f <= camps.length-1; f++){
                        body += '<div class="eventCamp" style="background:#'+camps[f].color+';"></div>';
                      }
                    }
                  }
                  body+=(day-firstDay)+'</div>';
                }
                day++;
            }
          }
          if (day > (monthLength+firstDay)) {
            break;
          }
          body +='<br>';
        }
        document.getElementById('headerCalendar').innerHTML = header;
        document.getElementById('bodyCalendar').innerHTML = "<div class='inner'>"+body+"</div>";
  }
  function getInfoDay(data){
    var data = data.split('-',3),
    agendOb={},
    agend = '';
    if(!Calendar[data[2]][data[1]]){
      document.getElementById('day-content').innerHTML = "<p><div class='errorCal'><p>Lo sentimos no existe contenido para el mes buscado.</p></div>";
      $("#calc small").html('0');
      $("#ventasRealizadas small").html('0');
      $("#visitas small").html('0');
    }
    if(!Calendar[data[2]][data[1]][data[0]] || !Calendar[data[2]][data[1]][data[0]].asignacion){
      document.getElementById('day-content').innerHTML = "<p><div class='errorCal'><p>Lo sentimos no existe contenido para este día.</p></div>";
      $("#calc small").html('0');
      $("#ventasRealizadas small").html('0');
      $("#visitas small").html('0');
    }
    else{
      var i = 0,ventas=0,libres=0,visitas=0;
      $.when(
        $.each(Calendar[data[2]][data[1]][data[0]].asignacion, function(index, val){
          if(!val.clientes){
            if(index == 'Libres'){
              libres=val.length;
              desc = 'Libres';
                agend += '<div class="holder">';
                agend += '<h3  data-place ="'+(parseInt(i)+1)+'" data-origin="'+[data[0]]+'-'+[data[1]]+'-'+[data[2]]+'" data-asig="'+desc+'" onclick="getInfoThis(this);">Ventas Libres</h3>';
                agend += '<div id="'+desc+'" class="loadDay"></div>';
                agend += '</div>';
            }
          }
            else{
            $.each(val.clientes, function(index2,val2){
              var desc = val2.distrito;
              visitas++;
              if(val2.status==true || val2.status==1 || val2.status=='true')
                  ventas++;
              if(!agendOb.hasOwnProperty(desc)){
                agendOb[desc]='';
                agend += '<div class="holder">';
                agend += '<h3  data-place ="'+i+'" data-origin="'+[data[0]]+'-'+[data[1]]+'-'+[data[2]]+'" data-asig="'+desc+'" onclick="getInfoThis(this);">Distrito '+desc+'</h3>';
                agend += '<div id="'+desc+'" class="loadDay"></div>';
                agend += '</div>';
                i++;
              }
            });
          }
        })
      ).done(function(){
        $('#ventasRealizadas small').text(ventas);
        $('#visitas small').text(visitas);
        $('#calc small').text(libres);
        document.getElementById('day-content').innerHTML = agend;
      });
    }
  }
}
function getInfoThis(t){
  var place = t.dataset.place,
      origin = t.dataset.origin,
      asig = t.dataset.asig;
      if(t.classList.contains('open')){
        document.getElementById(''+asig+'').innerHTML = '';
        t.classList.remove('open');
      }
      else{
        t.classList.add("open");
        if(asig != 'Libres'){
        var loadThis = '<div data-origin="'+origin+'" data-asig="'+asig+'" data-todo="'+place+'" onclick="loadCont(this);" class="son">Todo</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-cam="'+place+'" onclick="loadCont(this);" class="son">Campañas</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-adq="'+place+'" data-type="venta" onclick="loadCont(this);" class="son">Adquisiciones</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-adq="'+place+'" data-type="sin venta" onclick="loadCont(this);" class="son">Sin adquisicion</div>'+
            '<div id="load-'+asig+'"></div>';
            document.getElementById(''+asig+'').innerHTML = loadThis;
        }
        else{
          date = origin.split('-'),
          place =  Calendar[date[2]][date[1]][date[0]].asignacion.Libres;
         loadThis = '<div id="load-'+asig+'"></div>';
          document.getElementById(''+asig+'').innerHTML = loadThis;
            Print(place,'todo',asig,origin);
        }
      }
}
function loadCont(t){
  var data = t.dataset.origin,
      data = data.split('-',3),
      asig = t.dataset.asig;
      place = Calendar[data[2]][data[1]][data[0]].asignacion;
      document.getElementById('load-'+asig).innerHTML = " ";
  if(t.dataset.cam){
    if(t.classList.contains('open')){
      t.classList.remove('open');
      document.getElementById('load-'+asig).innerHTML = " ";
    }
      else{
        $(".son").removeClass('open');
        t.classList.add('open');
        dataLoad = t.dataset.cam,
        obj = {},
        type = "campania";
        $.each(place, function(index, val){
          var clien=[];
          $.each(val.clientes,function(i,v){if(v.distrito==asig)clien.push(v);});
          if(!obj[val.descripcion]){
            obj[val.descripcion] = {};
            obj[val.descripcion]= clien;
          }
          else{
            obj[val.descripcion] = clien;
          }
          Print(obj,type,asig,t.dataset.origin);
        });
    }
  }
  if(t.dataset.adq){
    if(t.classList.contains('open')){
        t.classList.remove('open');
    }
    else{
      dataLoad = t.dataset.adq,
      obj = {},
      type = t.dataset.type,
      i = 0;
      if(type == "venta"){
          $(".son").removeClass('open');
          t.classList.add('open');
        $.each(place, function(index, val) {
          $.each(val.clientes, function(index2, val2) {
            if(val2.distrito==asig){
              if(val2.status == "venta" || val2.status == true || val2.status == "Venta"){
                val2.status = "Venta";
                obj[i] = val2;
                i++;
              }
            }
          });
        });
      }
      if(type == "sin venta"){
          $(".son").removeClass('open');
          t.classList.add('open');
        $.each(place, function(index, val) {
          $.each(val.clientes, function(index2, val2) {
            if(val2.distrito==asig){
              if(val2.status == "sin venta" || val2.status == false || val2.status == "Sin Venta"){
                val2.status = "Sin Venta";
                obj[i] = val2;
                i++;
              }
            }
          });
        });
      }
      Print(obj,type,asig);
    }
  }
  if(t.dataset.todo){
    if(t.classList.contains('open')){
        t.classList.remove('open');
    }
    else{
      $(".son").removeClass('open');
      t.classList.add('open');
      dataLoad = t.dataset.todo,
      obj = {},
      type = "todo",
      i = 0;
        $.each(place, function(index, val) {
          $.each(val.clientes, function(index2, val2){
            if(val2.distrito==asig){
              obj[i] = val2;
              i++;
            }
          });
        });
      Print(obj,type,asig);
    }
  }
}
  function Print(obj,type,data,origin){
    var insert = document.getElementById('load-'+data);
    insert.innerHTML = '';
    insert.classList.add('loadResult');
    if(type == "campania"){
      $.each(obj, function(i,v){
        if(!v[0].campaña){}
        else{
          insert.innerHTML = insert.innerHTML+'<div class="row"><div class="name"><h3  onclick="toggleThis(this);" data-toggle="'+i+'" data-idCamp="'+v[0].campaña+'" data-origin="'+origin+'">'+i+'</h3></div><div id="'+i+'" class="campLoad"></div></div>';
          var insert2 = document.getElementById(i);
          $.each(v, function(ix,vx){
            insert2.innerHTML = insert2.innerHTML+'<div class="row2"><div><h3  onclick="toggleThis(this);" data-toggle="node-'+ix+'">cliente '+vx.nombre+'</h3></div><div id="node-'+ix+'" class="campLoad"></div></div>';
            var insert3 = document.getElementById('node-'+ix);
            $.each(vx, function(ixx,vxx){
              insert3.innerHTML = insert3.innerHTML +'<div class="innerRow"><div>'+ixx+':</div><div>'+vxx+'</div></div>';
            });
          });
        }
      });
    }
    if(type == "todo" || type == "venta" || type == "sin venta"){
      $.each(obj, function(a, b) {
            insert.innerHTML = insert.innerHTML+'<div class="row"><div class="name"><h3  onclick="toggleThis(this);" data-toggle="node-'+a+'">cliente '+b.nombre+'</h3></div><div id="node-'+a+'" class="campLoad"></div></div>';
            var insert2 = document.getElementById('node-'+a);
         $.each(b, function(c, d) {
            insert2.innerHTML = insert2.innerHTML +'<div class="innerRow"><div>'+c+':</div><div>'+d+'</div></div>';
         });
      });
    }
  }
function toggleThis(t){
  console.log(t);
  var value = t.dataset.toggle,
      node = document.getElementById(value),
      idCamp = t.dataset.idcamp,
      origin = t.dataset.origin;
      console.log(t.dataset.origin);
  if(t.classList.contains("open")){
    node.style.display = "none";
    t.classList.remove("open");
    printScore(idCamp,origin,'clear');
  }
  else{
    node.style.display = "block";
    t.classList.add("open");
    printScore(idCamp,origin,'print');
  }
}
function printScore(id,origin,action){
  console.log(origin);
  var date = origin.split('-'),
      obj = Calendar[date[2]][date[1]][date[0]].campInfo;
  if(action == 'clear'){
    $("#ventasRealizadas small").html('0');
    $("#visitas small").html('0');
    $("#calc small").html('0');
  }
  else{
    for(var i = 0; i <= obj.length-1; i++ ){
      if(obj[i].idCamp == id){
        $("#ventasRealizadas small").html(obj[i].meta.ventas);
        $("#visitas small").html(obj[i].meta.visitas);
        $("#calc small").html(obj[i].meta.meta);
      }
    }
  }
}
printCampDone = [];
function printCamps(){
  var agend = "";
    if(fielderCamp){
    agend+= '<div id="colorCode">';
      agend+='<h3>Campañas asignadas</h3>';
    for(var i = 0; i <= fielderCamp.length-1; i++){
      if(!printCampDone.includes(fielderCamp[i].campana.id)){
          printCampDone.push(fielderCamp[i].campana.id);
          agend+='<div class="row">';
            agend+='<div class="color" style="background:#'+fielderCamp[i].campana.color+';"></div>';
            agend+='<p class="titulo" style="color:#'+fielderCamp[i].campana.color+';">'+
                      fielderCamp[i].campana.titulo+'</p>';
            agend+='<p>'+fielderCamp[i].campana.descripcion+'</p>';
            agend+='<p class="mets"><span>'+fielderCamp[i].campana.meta+'</span><span>'+
              fielderCalendar[fielderCamp[i].campana.id].TotalVentas+'</span></p>'
          agend+= '</div>';
        }
    }
    agend+= '</div>';
  }
  document.getElementById('camps').innerHTML = agend;
  function includes(k) {
    for(var i=0; i < this.length; i++){
      if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
        return true;
      }
    }
    return false;
  }
  printCampDone = [];
}
function createCal(){
  Calendar = {};
  for(var i = 0; i <= fielderCamp.length-1; i++){
    c = fielderCamp[i].campana.fechaInicio;
    b = fielderCamp[i].campana.fechaFin;
    splitInicio = c.split('-'),
    splitFinal = b.split('-'),
    oneDay = 24*60*60*1000,
    firstDate = new Date(splitInicio[0],splitInicio[1],splitInicio[2]),
    secondDate = new Date(splitFinal[0],splitFinal[1],splitFinal[2]),
    diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))),
    mm = splitInicio[1]-1,
    yy = splitInicio[0],
    changeMonth = 0;
    mmdif = parseInt( splitFinal[1]) -  parseInt(splitInicio[1]);
    for(var f = 0; f <= diffDays;){
      monthLength = new Date(yy, mm+1, 0).getDate();
    for (a = 1; a <= monthLength; a++){
    if(changeMonth == 0){
      if(mm == splitInicio[1]-1){
        a = splitInicio[0];
        diffDays - parseInt(a);
        changeMonth++;
      }
    }
    if(a == parseInt(splitFinal[0])+1){
      patt = /^0[0-9].*$/,
      monthNum = parseInt(splitFinal[1])-1;
      if(patt.test(monthNum)){
        var mmParse = monthNum.toString().split('');
        if(mm == mmParse[1]){
          break;
        }
      }
      else{
        if(mm == monthNum){
          break;
        }
      }
    }
    if(!Calendar[yy]){
      Calendar[yy] ={};
    }
    if(!Calendar[yy][mm]){
      Calendar[yy][mm] = {};
    }
      if(!Calendar[yy][mm][a]){
        Calendar[yy][mm][a] = {};
      }
    if(Calendar[yy][mm][a]){
      newObj = Calendar[yy][mm][a];
        if(a >= splitInicio[2] || mm >= splitInicio[1]){
          printDates();
        }
      }
      if(a == monthLength){
        mm++;
      }
      if(mm == 12){
        yy++;
        mm = 0;
      }
      function printDates(){
        if(f <= (diffDays + parseInt(splitInicio[2]) + mmdif)){
          if(!newObj.campInfo){
            newObj.campInfo = [];
          }
          if(newObj.campInfo){
            newObj.campInfo[newObj.campInfo.length] = {},
            newObj.campInfo[newObj.campInfo.length-1]['id'] = fielderCamp[i].campana.id,
            newObj.campInfo[newObj.campInfo.length-1]['color'] = fielderCamp[i].campana.color;
          }
        }
          hasSomeThing(newObj,yy,mm,a);
      }
      f++;
    }
  }
}
}
function ObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
function hasSomeThing(o,y,m,a){
  if(!o.campInfo){
  }
  else{
    for(var i = 0; i <= o.campInfo.length-1; i++){
      if(!o.asignacion){
        o.asignacion = {};
      }
      if(!fielderCalendar.Libres){}
      else{
        if(fielderCalendar.Libres.Visitas[y]){
          if(fielderCalendar.Libres.Visitas[y][m]){
            if(fielderCalendar.Libres.Visitas[y][m][a]){
              o.asignacion["Libres"] = fielderCalendar.Libres.Visitas[y][m][a];
            }
          }
        }
      }

        if(!fielderCalendar[o.campInfo[i].id]){
          fielderCalendar[o.campInfo[i].id] = {};
          fielderCalendar[o.campInfo[i].id].Visitas = {};
        }
        if(!fielderCalendar[o.campInfo[i].id].Visitas[y]){
          fielderCalendar[o.campInfo[i].id].Visitas[y] = {};
        }if(!fielderCalendar[o.campInfo[i].id].Visitas[y][m]){
         fielderCalendar[o.campInfo[i].id].Visitas[y][m] ={};
        }
        if(!fielderCalendar[o.campInfo[i].id].Visitas[y][m][a]){
          fielderCalendar[o.campInfo[i].id].Visitas[y][m][a] = {};
        }
        if(!o.asignacion[o.campInfo[i].id]){
          o.asignacion[o.campInfo[i].id] = {};
        }
        o.asignacion[o.campInfo[i].id] = {};
        o.asignacion[o.campInfo[i].id]["clientes"] = [],
        o.asignacion[o.campInfo[i].id]["clientes"] = fielderCalendar[o.campInfo[i].id].Visitas[y][m][a];
        for(var y = 0; y <= fielderCamp.length-1; y++){
          if(fielderCamp[y].campana.id == o.campInfo[i].id){
            o.asignacion[o.campInfo[i].id]["descripcion"] = fielderCamp[y].campana.titulo;
          }
        }
    }
  }
localStorage.setItem('Calendar',{});
Calendar = JSON.stringify(Calendar);
localStorage.setItem('Calendar',Calendar);
Calendar = JSON.parse(localStorage.getItem('Calendar'));
}


  var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("ine").value ="data:image/jpeg;base64,"+btoa(binaryString);
        };
        reader.readAsBinaryString(file);
    }
};
  var handleFileSelect2 = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("comp").value ="data:image/jpeg;base64,"+btoa(binaryString);
        };
        reader.readAsBinaryString(file);
    }
};

    function validation(){
      $('.error').remove();
      var ValObj = {};
        ValObj[0] = document.getElementsByClassName('mandatory'),
        ValObj[1] = document.getElementsByClassName('numeric'),
        ValObj[2] = document.getElementsByClassName('text'),
        ValObj[3] = document.getElementsByClassName('email');
      var size = ObjectSize(ValObj)-1,
        error = 0;
        for(var i = 0; i <= size; i++){
          for(var b = 0; b <= ValObj[i].length-1; b++){
            if(i == 0){
              if(ValObj[i][b].value == "" || ValObj[i][b].value == " " ){
                var text = document.createElement('div');
                  text.classList.add('error');
                  text.innerHTML = "<p>auch! ese campo es obligatorio..";
                insertAfter(ValObj[i][b], text);
                error = 1;
              }
              else{
              }
            }
            if(i == 1){
              var soWhat = numberTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es número..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
            if(i == 2){
              var soWhat = textTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es texto..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
            if(i == 3){
              var soWhat = mailTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es email valido..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
          }
        }
      if(error == 0){
        //se envia el formulario
        $("#shure").addClass('active');
        $("#shureContent").html('');
        for(var i = 0; i <= fielderCamp.length-1; i++){
          if(reportObj.campañas[0] == fielderCamp[i].campana.id){
            $("#shureContent").append('<span>Adquisicón:</span>'+fielderCamp[i].campana.titulo+'');
            break;
          }
        }

        $("#shureContent").append('<span>Usuario:</span>'+ document.getElementsByName("nombre")[0].value+' '+document.getElementsByName("paterno")[0].value +' '+document.getElementsByName("materno")[0].value+'');
        $("#shureContent").append('<span>Direccion:</span>'+ document.getElementsByName("calle")[0].value+' '+document.getElementsByName("numExt")[0].value +' '+document.getElementsByName("numInt")[0].value+' '+document.getElementsByName("colonia")[0].value+'');
          for(var i = 0; i < formHistory.length; i++){
            $("#shureContent").append(formHistory[i]);
          }
      }
      function ObjectSize(obj) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) size++;
          }
          return size;
      }
      function mailTest(v){
        var val = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return val.test(v);
      }
      function textTest(v){
        if (!isNaN(v))
        {
          return false;
        }
      }
      function numberTest(v){
        if (isNaN(v) || v== "")
        {
          return false;
        }
      }
      function insertAfter(referenceNode, newNode) {
          referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
    }
      function checkOut2(){
        $("#shure .inner").html('<h1>Procesando contratación...</h1>');
         var $form = $("#express-node"),
                  action = $form.attr("action"),
                  toSend = JSON.stringify(getFormData($form));
                  console.log(toSend);
                $.ajax({
                  url: $form.attr("action"),
                  type: 'POST',
                  contentType: 'application/json',
                  //Authorization: 'Bearer f8d59a90d34ff29b4c4b39fc1216da91',
                  data: toSend,
                })
              .done(function(data) {
                console.log("success");
                if(data.mensaje == undefined){
                  data.mensaje = "no definido, no se enviara";
                }
                $("#shure .inner").html('<h3>¡Gracias por su contratación!</h3>'+
                                          '<p>Su folio de servicio es:</p>'+
                                          '<strong>'+data.idPisa+'</strong>'+
                                          '<p>la informacion sera enviada al correo</p>'+
                                          '<strong>'+data.mensaje+'</strong>'+
                                          '<div id="so">'+
                                          '<div class="left" onclick="doneAllSet();">'+
                                          '<p>OK</p>'+
                                          '</div>'+
                                          '</div>');
                    devSave2(data.idPisa);
              })
              .fail(function(data) {
                $("#shure .inner").html('<h3>Lo sentimos su transaccion no fue exitosa...</h3>'+
                                          '<div id="so">'+
                                          '<div class="left" onclick="closeCheckOut();">'+
                                          '<p>Cerrar <i class="fa fa-times"></i></p>'+
                                          '</div>'+
                                          '</div>');
              });
      function getFormData($form){
          var unindexed_array = $form.serializeArray();
          var indexed_array = {};

          $.map(unindexed_array, function(n, i){
              indexed_array[n['name']] = n['value'];
          });

          return indexed_array;
      }
    }
            function doneAllSet(){
              reportObj["status"] = {};
              reportObj.status = "venta";
              reportObj["razon"] = "venta concretada";
              cachInfo();
            }


    function loadInfo(){
  var split = reportObj.usuario[1].split(' ');
  setTimeout(function(){
          document.getElementById('region').value = reportObj.llave;
          document.getElementById('geoId').value  = latitude+","+longitude;
          document.getElementById('idCamp').value =  reportObj.usuario[0];
          document.getElementById('vivo').value =  reportObj.tipo;
        if(split.length == 4){
            document.getElementsByName('nombre')[0].value = split[0] +" "+ split[1];
            document.getElementsByName('paterno')[0].value = split[2];
            document.getElementsByName('materno')[0].value = split[3];
        }
        if(split.length == 5){
            document.getElementsByName('nombre')[0].value = split[0] +" "+ split[1];
            document.getElementsByName('paterno')[0].value = split[2];
            document.getElementsByName('materno')[0].value = split[3] +" "+ split[4];
        }
        if(split.length == 3){
            document.getElementsByName('nombre')[0].value = split[0];
            document.getElementsByName('paterno')[0].value = split[1];
            document.getElementsByName('materno')[0].value = split[2];
        }
        document.getElementsByName('telefono')[0].value = reportObj.usuario[2];
        //document.getElementsByName('calle')[0].value = reportObj.usuario[3];
       var split2 = reportObj.usuario[3].split(','),
            split3 = [],
            insertCalle = "",
            insertCol = "";
          console.log(split2.length-1);
          for(var i = 0; i <= split2.length-1; i++){
            var item = split2[i].split(" ");
            split3.push(item);
          }
          console.log(split3);
          for(var i = 0; i <= split3.length-1; i++){
            for(var a = 0; a <= split3[i].length-1; a++){
              if(i == 0){
                  if(a == split3[i].length-1){
                    document.getElementsByName('numExt')[0].value = split3[i][a];
                  }
                  else{
                    insertCalle = insertCalle+" "+split3[i][a];
                    document.getElementsByName('calle')[0].value = insertCalle;
                  }
              }
              if(i == 1){
                if(a != 0){
                  insertCol = insertCol+" "+split3[i][a];
                  document.getElementsByName('colonia')[0].value = insertCol;
                }
              }
              if(i == 2){
                if(a == 1){
                  document.getElementsByName('cp')[0].value = split3[i][a];
                }
              }
            }
          }
      $.ajax({
        url: ''+hostVar+':9090/telmex/get/estados',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#noShit").html('');
        var response = data.apiResponse[0];
        for(var i = 0; i <= response.length-1; i++){
          $("#noShit").append('<option value='+response[i].idEstado+'>'+response[i].descripcion+'</option>');
        }
      });
        document.getElementById('inePic').addEventListener('change', handleFileSelect, false);
        document.getElementById('compPic').addEventListener('change', handleFileSelect2, false);
        }, 100);
  }

  function footerAction(){
    var footer = document.getElementById('footer'),
        menu = document.getElementById('holderFooter');
        if(footer.classList.contains('open')){
          menu.classList.remove('open');
          footer.classList.remove('open');
        }
        else{
          menu.classList.add('open');
          footer.classList.add('open');
        }

  }


function chooseAdress(){
  var insert = document.getElementById('mapaPush');
  insert.classList.add('open');
  document.getElementById('fixedMarker').style.display= "block";
  document.getElementById('fixedMarker').style.height= "100%";
   document.getElementById('closeMap').addEventListener('click', closeUbication);

            var myLatlng = new google.maps.LatLng(19.4346601,-99.1667576);
                var mapOptions = {
                  center: myLatlng,
                  zoom: 19
                };

            var map = new google.maps.Map(document.getElementById("fixedMarker"),
                mapOptions);

            marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map
            });
            var infowindow = new google.maps.InfoWindow,
                geocoder = new google.maps.Geocoder;
            google.maps.event.addListener(map, 'drag', function() {
                center = map.getCenter();
                marker.setPosition(center);
            });

   google.maps.event.addListener(map, "dragend", function(event) {
                    data = marker.getPosition().lat()+','+marker.getPosition().lng();
                    geocodeLatLng(geocoder, map, infowindow, data);
        });
function closeUbication(){
  insert.classList.remove('open');
  document.getElementById('fixedMarker').style.display = "none";
  document.getElementById('fixedMarker').style.height = "0";
}
function geocodeLatLng(geocoder, map, infowindow,data) {
  var insertNew = document.getElementById('direccion'),
      geo = document.getElementById('geoSend');
      geo.value = data;
  var input = data;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
        insertNew.innerHTML = results[0].formatted_address;

      } else {
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
        insertNew.innerHTML = results[0].formatted_address;
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
      google.maps.event.addDomListener(window, 'load', initialize);
  }
  //recibo objeto
function saveInCalendar(obj){
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
        if(!Calendar[y]){
        Calendar[y] = {};
        }
        if(!Calendar[y][m]){
          Calendar[y][m] = {};
        }
        if(!Calendar[y][m][d]){
          Calendar[y][m][d] = {};
        }
        size = Calendar[y][m][d];
        if(obj.llave == "" || obj.llave == undefined){
          if(!size.asignacion["Libres"]){
            size.asignacion["Libres"] = {};
          }
          size = size.asignacion["Libres"],
          size[ObjectSize(size)] = {},
          size[ObjectSize(size)-1]["nombre"] = obj.usuario[1],
          size[ObjectSize(size)-1]["telefono"] = obj.usuario[2],
          size[ObjectSize(size)-1]["geo"] = obj.usuario[4],
          size[ObjectSize(size)-1]["direccion"] = obj.usuario[3];
          size[ObjectSize(size)-1]["status"] = obj.status;
          size[ObjectSize(size)-1]["tipo"] = obj.tipo;
          size[ObjectSize(size)-1]["razon"] = obj.razon;
          size[ObjectSize(size)-1]["distrito"] = "venta sin distrito";
          for(var n = 0; n <= fielderCamp.length-1; n++){
            if(fielderCamp[n].campana.id = obj.usuario[0]){
              size[ObjectSize(size)-1]["campaña"] = fielderCamp[n].campana.titulo ;
            }
          }
        }
        else{
          size = size.asignacion[obj.campañas[0]];
          size.clientes[ObjectSize(size.clientes)] = {},
          size.clientes[ObjectSize(size.clientes)-1]["nombre"] = obj.usuario[1],
          size.clientes[ObjectSize(size.clientes)-1]["telefono"] = obj.usuario[2],
          size.clientes[ObjectSize(size.clientes)-1]["geo"] = obj.usuario[4],
          size.clientes[ObjectSize(size.clientes)-1]["direccion"] = obj.usuario[3];
          size.clientes[ObjectSize(size.clientes)-1]["status"] = obj.status;
          size.clientes[ObjectSize(size.clientes)-1]["tipo"] = obj.tipo;
          size.clientes[ObjectSize(size.clientes)-1]["razon"] = obj.razon;
          split = obj.llave.split('-');
          size.clientes[ObjectSize(size.clientes)-1]["distrito"] = split[2];
          for(var n = 0; n <= fielderCamp.length-1; n++){
            if(fielderCamp[n].campana.id = obj.usuario[0]){
              size.clientes[ObjectSize(size.clientes)-1]["campaña"] = fielderCamp[n].campana.titulo ;
            }
          }
        }
  Calendar = JSON.stringify(Calendar);
  localStorage.setItem('Calendar',Calendar);
  Calendar = JSON.parse( localStorage.getItem('Calendar'));
  reportObj = {};
  location.reload();
}
function devSave2(idOk){
  var geoPosition = document.getElementById('geoId').value,
      servicioTipo  = document.getElementsByName('servicioTipo')[0].value,
      servicioId = document.getElementsByName('servicioId')[0].value,
      camp = document.getElementById('idCamp').value,
      nombre = document.getElementsByName('nombre')[0].value,
      paterno = document.getElementsByName('paterno')[0].value,
      materno = document.getElementsByName('materno')[0].value,
      telefono = document.getElementsByName('telefono')[0].value,
      celular = document.getElementsByName('celular')[0].value,
      email = document.getElementsByName('email')[0].value,
      rfc = document.getElementsByName('rfc')[0].value,
      tipoCalle = document.getElementsByName('tipoCalle')[0].value,
      calle = document.getElementsByName('calle')[0].value,
      numExt = document.getElementsByName('numExt')[0].value,
      numInt = document.getElementsByName('numInt')[0].value,
      entreCalle1 = document.getElementsByName('entreCalle1').value,
      entreCalle2 = document.getElementsByName('entreCalle2').value,
      colonia = document.getElementsByName('colonia')[0].value,
      cp = document.getElementsByName('cp')[0].value;
      if(document.getElementsByName('estado')[0]){
        var selIndex = document.getElementsByName('estado')[0].selectedIndex,
             estado = document.getElementsByName('estado')[0].options[selIndex].innerHTML;
      }
      selIndex2 = document.getElementsByName('estado')[0].selectedIndex,
      municipio = document.getElementsByName('municipio')[0].options[selIndex2].innerHTML,
      ine = document.getElementById('ine').value,
      comp = document.getElementById('comp').value,
      parts = geoPosition.split(',', 2),
      region = document.getElementById('region').value,
      vivo = document.getElementById('vivo').value;
      data = {"idContrato":""+idOk+"","latitud":""+parts[0]+"","longitud":""+parts[1]+"","servicioTipo": ""+servicioTipo+"","servicioId":""+servicioId+"","nombre":""+nombre+"","paterno":""+paterno+"","materno":""+materno+"","telefono":""+telefono+"","email":""+email+"","rfc":""+rfc+"","tipoCalle":""+tipoCalle+"","calle":""+calle+"","numExt":""+numExt+"","numInt":""+numInt+"","entreCalle1":""+entreCalle1+"","entreCalle2":""+entreCalle2+"","colonia":""+colonia+"","delMun":""+municipio+"","cp":""+cp+"","estado":""+estado+"","modemEntrega":" ","reciboSinpapel":" ","fecha":"","latitud":""+parts[0]+"", "longitud":""+parts[1]+"","idtipo":" ","identifica":" ","celular":""+celular+"","idFielder":""+userId+"","imagenIfe": ""+ine+"", "imagenComprobanteDe":""+comp+"","region":""+region+"","idCampaign":""+camp+"", "vivo":""+vivo+""};
      persistencia(data);
}
$(document).on("click","#campaniasAsignadas .row",function(){
  var color=$(this).attr('data-id'),
      areas = $(this).attr('data-places'),
      split = areas.split(',');
      for(var i = 0; i <= split.length-1; i++ ){
        parts = split[i].split('-');
        if(parts[2] != 0){

        }
        else{
          for(var i = 0; i <= fielderRegs.Region.length-1; i++){
            if(fielderRegs.Region[i].Area = parts[1]){
              console.log('L: 1473');
              //fielderRegs.Distrito
              map.data.setStyle(function(feature){
                return({
                  fillColor:'#'+color,
                  strokeOpacity:1,
                  strokeWeight:1
                });
              });
            }
          }
        }
      }
});
$(document).on("click","#closeImageDisplay",function(){$(this).parent().remove();});
areIn = [];
function getCampDist(v){
	document.getElementById('mercaBox').innerHTML = "";
  $('#masterLogin').removeClass('ani').fadeOut();
	if(!v){
		var llave = reportObj.llave.split('-'),
			img,id,titulo,descripcion,
			insert = document.getElementById('mercaBox');
		for(var i = 0; i<= fielderCamp.length-1; i++){
			for(var b = 0; b <= fielderCamp[i].campReg.length-1; b++){
				hook = fielderCamp[i].campReg[b].region.split('-');
				if(llave[0] == hook[0] && llave[1] == hook[1]){
					id = fielderCamp[i].campana.id,
					titulo = fielderCamp[i].campana.titulo,
					descripcion = fielderCamp[i].campana.descripcion;
          img = imagesPlaces+fielderCamp[i].campana.imagen;
				}
				if(llave[0] == hook[0] && llave[1] == hook[1] && llave[2] == hook[2]){
					id = fielderCamp[i].idCampaña,
					titulo = fielderCamp[i].campana.titulo,
					descripcion = fielderCamp[i].campana.descripcion;
          img = imagesPlaces+fielderCamp[i].campana.imagen;
				}
          if(!areIn.includes(id)){
            areIn.push(id);
  					insert.innerHTML = insert.innerHTML+'<div class="cont">'+
              '<div class="t">'+titulo+'</div>'+
              '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
    					'<div class="descripcion">'+descripcion+'</div>'+
              '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this)"> Contratar</a>'+
  					'</div>';
          }

			}
		}
	}
	else{
		for(var i = 0; i <= fielderCamp.length-1; i++){
			if(fielderCamp[i].campana.id == v){
				id = fielderCamp[i].campana.id,
				titulo = fielderCamp[i].campana.titulo,
				descripcion = fielderCamp[i].campana.descripcion,
				insert = document.getElementById('mercaBox');
        img = imagesPlaces+fielderCamp[i].campana.imagen;
        if(!areIn.includes(id)){
          areIn.push(id);
          insert.innerHTML =  insert.innerHTML+"<h1>campaña dirigida</h1>";
          insert.innerHTML = insert.innerHTML+'<div class="cont">'+
          '<div class="t">'+titulo+'</div>'+
          '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
          '<div class="d">'+descripcion+'</div>'+
          '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this)"> Contratar</a>'+
          '</div>';
        }
			}
		}
    var llave = reportObj.llave.split('-'),
      img,id,titulo,descripcion,
      insert = document.getElementById('mercaBox');
    for(var i = 0; i<= fielderCamp.length-1; i++){
      for(var b = 0; b <= fielderCamp[i].campReg.length-1; b++){
        hook = fielderCamp[i].campReg[b].region.split('-');
        if(llave[0] == hook[0] && llave[1] == hook[1]){
          var img = imagesPlaces+fielderCamp[i].campana.imagen,
          id = fielderCamp[i].campana.id,
          titulo = fielderCamp[i].campana.titulo,
          descripcion = fielderCamp[i].campana.descripcion;
        }
        if(llave[0] == hook[0] && llave[1] == hook[1] && llave[2] == hook[2]){
          var img = imagesPlaces+fielderCamp[i].campana.imagen,
          id = fielderCamp[i].idCampaña,
          titulo = fielderCamp[i].campana.titulo,
          descripcion = fielderCamp[i].campana.descripcion;
        }
          if(!areIn.includes(id)){
          areIn.push(id);
          insert.innerHTML =  insert.innerHTML+"<h1>campaña por region</h1>";
          insert.innerHTML = insert.innerHTML+'<div class="cont">'+
            '<div class="t">'+titulo+'</div>'+
            '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
            '<div class="descripcion">'+descripcion+'</div>'+
            '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this);"> Contratar</a>'+
          '</div>';
        }
      }
    }
    $('#mercaBox').append('<div class="cont">'+
            '<div class="t" style="padding:10px">Agendador</div>'+
            '<iframe src="https://187.217.179.35:81/agenda?tel='+reportObj.usuario[2]+'" frameborder="0"></iframe>'+
          '</div>');
	}
  function includes(k) {
    for(var i=0; i < this.length; i++){
      if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
        return true;
      }
    }
    return false;
  }
}
function mercaCrossModul(t){
	if(cc[t].vivo == true){
		loadPageCore('#merca');
		geo = cc[t].latitud+','+cc[t].longitud,
		reportObj["fielderId"] = userId,
		reportObj["usuario"] = [cc[t].id,cc[t].cliente,cc[t].telefono,cc[t].direccion,geo],
		reportObj["campañas"]=[cc[t].id],
		reportObj["llave"] = cc[t].region;
		reportObj["tipo"] = true;
		reportBox();
	}
	else{
		loadPageCore('#merca');
	}
}
function campCrossModul(t){
  masterLogin();
   loadPageCore("#merca");
   if(!document.getElementById('clientPosition')){
      setTimeout(function(){
     data = document.getElementById('clientPosition');
     data.classList.add('open');
      idAdq = t.dataset.camp,
      geo = document.getElementById('geoSend'),
      name = document.getElementById('nameSend'),
      telefono = document.getElementById('telefonoSend'),
      address = document.getElementById('direccion'),
      document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd),
      document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
      },700);
   }
   else{
     data = document.getElementById('clientPosition');
     data.classList.add('open');
      idAdq = t.dataset.camp,
      geo = document.getElementById('geoSend'),
      name = document.getElementById('nameSend'),
      telefono = document.getElementById('telefonoSend'),
      address = document.getElementById('direccion'),
      document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd),
      document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
   }
      function getInfoEnd(){
        var datos = [idAdq,document.getElementById('nameSend').value,telefono.value,address.value,geo.value];
        reportObj["usuario"] = datos;
        reportObj["campañas"] = [],
        reportObj.campañas[0] = idAdq;
        reportObj["llave"] = "";
        finishRepo();
      }
      function getInfo(){
            masterLogin();
            var datos = [idAdq,document.getElementById('nameSend').value,telefono.value,address.value,geo.value];
            reportObj["usuario"] = datos;
            reportObj["campañas"] = [],
            reportObj.campañas[0] = idAdq;
            document.getElementById('clientPosition').classList.remove('open');
            $("#mercaBox").load("formularios.html #expressTelmex", function(){
              loadInfo();
            });
          setTimeout(function(){
            document.getElementById('masterLogin').style.display = "none";
          },1000);
      }
  var geocoder = new google.maps.Geocoder;
  geocodeLatLng(geocoder, map, infowindow);
    function geocodeLatLng(geocoder, map, infowindow) {
      var latlng = {lat: latitude, lng: longitude};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            document.getElementById('direccion').innerHTML = String(results[0].formatted_address);
          }
            else {
              window.alert('No results found');
            }
          }
          else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
}

function reportBox(t){
		if(!t){
			var steep = 0,
				type = "cliente";
				document.getElementById('masterLogin').style.display = 'block';
		}
		else{
			var steep = t.dataset.steep,
				type = t.dataset.type;
		}
		if(steep == 0){
			if(type == "cliente"){
				 if(!t){
					setTimeout(function(){
              document.getElementById('content').classList.add('not');
						getCampDist(reportObj.usuario[0]);
					}, 1000);
				 }
				 else{
 					searchNumber();
				 }
			}
			if(type == "no cliente"){
				toModel();
				getCampDist();
			}
			//agregar id distrito y id producto
			//falta agregar la informacion del usuario en este paso
			if(!t){
        setTimeout(function(){
          $('#masterLogin').removeClass('ani').fadeOut();
        },4000);
			}
			else{
				reportObj["fielderId"] = userId;
				reportObj["tipo"] = type;
				var ofert = document.getElementsByClassName('buy'),
					codes = [];
				for(var i = 0; i <= ofert.length-1; i++){
					codes.push(ofert[i].dataset.id);
				}
				reportObj["campañas"] = codes;
			}
		}
	if(steep == 1){
		var insert = document.getElementById('clientPosition'),
			geo = document.getElementById('geoSend'),
			name= document.getElementById('nameSend'),
			telefono= document.getElementById('telefonoSend'),
			address= document.getElementById('direccion'),
			idAdq = t.dataset.id;
			insert.classList.add('open');
		//modificar por no cliente
		if(reportObj.tipo == false){
			var geocoder = new google.maps.Geocoder;
			geocodeLatLng(geocoder, map, infowindow);
			document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd);
			document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
			function getInfoEnd(){
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
			}
			function getInfo(){
        masterLogin();
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
				document.getElementById('clientPosition').classList.remove('open');
				$("#mercaBox").load("formularios.html #expressTelmex");
					loadInfo();
           document.getElementById('masterLogin').style.display = "none";
			}
		}
		if(reportObj.tipo == true){
			for(var i = 0; i <= reportObj["usuario"].length-1; i++){
					if(i == 1){
						name.value = reportObj["usuario"][i];
						name.text = reportObj["usuario"][i];
					}
					if(i == 2){
						telefono.value = reportObj["usuario"][i];
						telefono.text = reportObj["usuario"][i];
					}
					if(i == 3){
						address.value = reportObj["usuario"][i];
						address.text = reportObj["usuario"][i];
					}

					if(i == 3){
						var geocoder = new google.maps.Geocoder;
						geocodeLatLng(geocoder, map, infowindow);
					}
				}
			latlng = latitude+','+longitude;
			reportObj["usuario"].push(latlng);
      function getInfoEnd(){
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
			}
      function getInfo(){
        masterLogin();
          setTimeout(function(){
            var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
            reportObj["usuario"] = datos;
            reportObj.campañas[0]=idAdq;
            document.getElementById('clientPosition').classList.remove('open');
            $("#mercaBox").load("formularios.html #expressTelmex", function(){
              loadInfo();
            });
          },1000);
          setTimeout(function(){
            document.getElementById('masterLogin').style.display = "none";
          },1000);
			}
			document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd);
			document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
		}
	}
document.getElementsByClassName('sendReport')[0].addEventListener('click',finishRepo);
}
	function geocodeLatLng(geocoder, map, infowindow) {
	  var latlng = {lat: latitude, lng: longitude};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
				document.getElementById('direccion').innerHTML = String(results[0].formatted_address);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
	function toModel(){
		$.each(fielderPols.Distritos, function(index, val) {
			var tope = val['geometry']['coordinates'][0],
			obj = [];
			for(var i = 0; i <= tope.length-1; i++){
				obj[i]={'lat':tope[i][0],'lng':tope[i][1]};
			}
			 var polygon = new google.maps.Polygon({
			    paths: obj
			  });

				getName(polygon,index);
		});
		function getName(pol,index){
			var latlng = new google.maps.LatLng(19.538309,-99.124570);
			if (google.maps.geometry.poly.containsLocation(latlng, pol)) {
			}
			else{
				//en pruebas operativas este codigo va en el if y este es el fallback
				for(var i = 0; i <= ObjectSize(fielderRegs.Region)-1; i++){
					if(fielderRegs.Region[i].Distrito == index){
						reportObj["llave"] = fielderRegs.Region[i].Nomenclatura;
						document.getElementById('typeCliente').style.display= "none";
					}
				}
			}
		}
	}
	function searchNumber(){
 		document.getElementById('phoneDialog').style.display = "block";
		document.getElementById('verify').addEventListener('click',verify);
		function verify(){
			number = document.getElementById('ClientNumber').value;
			var tn = /^[0-9]*$/;
			if(tn.test(number)){
				if(number != "" || number != null || number != undefined){
					query(number);
				}
			}
			else{
				document.getElementsByClassName('error')[0].classList.add('open');
			}
			function query(n){
        var obj='';
        $.when(
    			$.each(fielderRegs.Areas, function(index, val){
    				$.each(fielderRegs.Areas[index], function(index2, val){
    					 $.each(fielderRegs.Areas[index][index2], function(index3, val){
    					 	var clients=fielderRegs.Areas[index][index2][index3].Clientes;
                console.log(clients);
                $.each(clients,function(k,v){
                  if(v.telefono==n){
                    obj=v;
    								var address = obj.direccion;
    								reportObj["usuario"] = [obj.id,obj.cliente,obj.telefono, address];
    								for(var i = 0; i <= ObjectSize(fielderRegs.Region)-1; i++){
    									if(index3 == fielderRegs.Region[i].Distrito){
    										reportObj["llave"] = fielderRegs.Region[i].Nomenclatura;
    									}
    								}
    					 		}
                });
    					 });
    				});
    			})
        ).done(function(){
    				if(obj!=''){
    					getCampDist(reportObj.usuario[0]);
    					document.getElementsByClassName('error')[0].classList.remove('open');
    					document.getElementById('typeCliente').style.display= "none";
    					document.getElementById('phoneDialog').style.display = "none";
    				}
    				else{
    					masterAlert("Lo sentimos el número no esta registrado");
    					$('#phoneDialog').hide();
    				}
        });
			}
		}
	}

function more(t){
	var source = t.dataset.source,
		type = t.dataset.type,
		insert = document.getElementById('showStuff'),
		id = t.dataset.id,
		buy = document.getElementById('buy');
		insert.classList.add('open');
		if(type == "close"){
			insert.classList.remove('open');
		}
		if(type == "video"){
			insert.getElementsByClassName('inner')[0].innerHTML = source;
		}
		else{
			var html = '<img src="'+source+'"/>';
			insert.getElementsByClassName('inner')[0].innerHTML = html;
		}
		//buy.setAttribute('data-id', id);
}
function expressPlug(){
	$("#typeCliente").load('contrataciones.html');
	document.getElementById('typeCliente').style.display = "block";
}
function repo(){
	document.getElementById('typeCliente').style.display = "none";

}
		function finishRepo(){
			var insert = document.getElementById('clientPosition');
			insert.classList.add('open');
			insert.innerHTML = '<div class="holderSelect fin">'+
			'<div class="porFinal"><h3>¿Por qué finaliza?</h3>'+
			'<div class="getData">'+
				'<select name="" id="reason">'+
					'<option value="sin datos">Seleccione un motivo</option>'+
					'<option value="No contrató">No contrató</option>'+
					'<option value="Desea más información vía Tecmarketing">Desea más información vía Tecmarketing</option>'+
					'<option value="Desea más información vía correo electrónico.">Desea más información vía correo electrónico.</option>'+
					'<option value="No desea el servicio">No desea el servicio</option>'+
					'<option value="Ya tiene el servicio">Ya tiene el servicio</option>'+
					'<option value="Prefiere servicio con otro proveedor">Prefiere servicio con otro proveedor</option>'+
					'<option value="Renta, tarifa o costo elevado">Renta, tarifa o costo elevado</option>'+
					'<option value="No se encuentra el decisor(Con agenda)">No se encuentra el decisor(Con agenda)</option>'+
					'<option value="No se encuentra el decisor(Sin agenda)">No se encuentra el decisor(Sin agenda)</option>'+
					'<option value="Ya tuvo el servicio y canceló">Ya tuvo el servicio y canceló</option>'+
					'<option value="Cliente satisfecho con servicio actual">Cliente satisfecho con servicio actual</option>'+
					'<option value="Desea servicio en otra línea">Desea servicio en otra línea</option>'+
					'<option value="Servicio no compatible/No convive con servicios activos">Servicio no compatible/No convive con servicios activos</option>'+
					'<option value="Plan excede necesidades">Plan excede necesidades.</option>'+
					'<option value="Prefiere hacer contratación por otro canal de venta">Prefiere hacer contratación por otro canal de venta</option>'+
					'<option value="Datos incompletos">Datos incompletos</option>'+
					'<option value="Cliente cambió de domicilio">Cliente cambió de domicilio</option>'+
					'<option value="Cliente no estaba en domicilio">Cliente no estaba en domicilio</option>'+
					'<option value="Domicilio no localizado">Domicilio no localizado</option> '+
				'</select>'+
				'<p id="endRepo">Finalizar <i class="fa fa-check"></i></p>'+
			'</div></div>'+
		'</div>';
		reportObj["status"] = {};
		reportObj.status = "sin venta";
		document.getElementById('endRepo').addEventListener('click',cachInfo);
	}
		function cachInfo(){
				if(reportObj.status == "sin venta"){
					status = 0;
					var value = document.getElementById('reason').value;
					reportObj["razon"] =value;
				}
				if(reportObj.status == "venta"){
					status = 1;
				}
				var obj = [];
				for(var i = 0; i <= reportObj.campañas.length-1; i++){
					var idCamp,
						status;
					if(jQuery.inArray(reportObj.campañas[i], reportObj.usuario) != -1){
						idCamp = reportObj.campañas[i];
					}
					obj[obj.length] = {"idFielder": reportObj.fielderId, "idCampaign": reportObj.usuario[0], "pesco": status, "region":reportObj.llave, "razon": reportObj.razon, "direccion":reportObj.usuario[3], "nombre":reportObj.usuario[1],"telefono":reportObj.usuario[2],"vivo":reportObj.tipo, "latitud":latitude,"longitud":longitude};
				}
				$.ajax({
					url: ''+hostVar+':9090/telmex/add/rc',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(obj),
				})
				.done(function() {
				masterAlert("Gracias la información fue procesada");
				})
				.fail(function() {
				//masterAlert("Error por favor vuelva a intentar");
				})
				.always(function() {
					console.log("complete");
				});
          setTimeout(function(){
              saveInCalendar(reportObj);
          },1000);
          function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

		}
var savePoint = "";
function savePointFallback(){
	var geocoder = new google.maps.Geocoder;
	geocodeLatLng(geocoder, map);
	function geocodeLatLng(geocoder, map, infowindow) {
	  var latlng = {lat: latitude, lng: longitude};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
				savePoint = String(results[0].formatted_address);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
	obj ={"latitud": ""+latitude+"","longitud": ""+longitude+"","idFielder": ""+userId+"","telefono":"","estado":0,"nombre": "bla bla bla erick es puto","direccion": ""+savePoint+""};
	$.ajax({
		url: ''+hostVar+':9090/telmex/add/clientegeo',
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(obj),
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	masterAlert('Enviado...');
}
function masterAlert(txt){
	insert = document.getElementById('masterAlert');
	insert.innerHTML = "<p>"+txt+"</p>";
	insert.classList.add('open');
	 setTimeout(function(){
	 	insert.classList.remove('open');
	 }, 3000);
}

   var done = [];
function PutInMapCamp(){
  for(var i = 0; i <= fielderCamp.length-1; i++){
    for(var b= 0; b <= fielderCamp[i].campReg.length-1; b++){
      var split = fielderCamp[i].campReg[b].region.split('-');
      if(split[2] != 0 && !done.includes(fielderCamp[i].idCr)){
        done.push(fielderCamp[i].idCr);
        $.each(fielderPols.Distritos, function(index, val) {
            if(split[2] == index){
              fielderPols.Distritos[index].properties.color = "#"+fielderCamp[i].campana.color;
              var insert = document.getElementById('campaniasAsignadas');
              insert.innerHTML = insert.innerHTML+
              "<div class='row' data-id='"+fielderCamp[i].campana.color+"'>"+
              "<div class='color' style='background:#"+fielderCamp[i].campana.color+";'></div>"+
              "<div class='innerRow'>"+
              "<div class='titulo'><p style='color:#"+fielderCamp[i].campana.color+";'>"+fielderCamp[i].campana.titulo+"</p></div>"+
              "<div class='descripcion'><p>"+fielderCamp[i].campana.descripcion+"</p></div>"+
              "</div>"+
              "</div>";
            }
          });
        }
        else{
            for(var c = 0; c <= fielderRegs.Region.length-1; c++){
               var splitRegs = fielderRegs.Region[c].Nomenclatura.split('-');
              if(split[1] == splitRegs[1] && !done.includes(fielderCamp[i].idCr)){
                done.push(fielderCamp[i].idCr);
                for(var n = 0; n <= fielderRegs.Region.length-1; n++){
                  if(fielderRegs.Region[n].Area == splitRegs[1]){
                      fielderPols.Distritos[fielderRegs.Region[n].Distrito].properties.color = "#"+fielderCamp[i].campana.color;
                  }
                }
                var insert = document.getElementById('campaniasAsignadas');
                areasVar = "";
                for(var f = 0; f <= ObjectSize(fielderCamp[i].campReg)-1; f++){
                    breakhere = fielderCamp[i].campReg[f].region.split('-');
                  if( breakhere[1] == splitRegs[1]){
                    areasVar = areasVar+fielderCamp[i].campReg[f].region+',';
                  }
                }
                insert.innerHTML = insert.innerHTML+
                "<div class='row' data-id='"+fielderCamp[i].campana.color+"' data-places='"+areasVar+"'>"+
                "<div class='color' style='background:#"+fielderCamp[i].campana.color+";'></div>"+
                "<div class='innerRow'>"+
                "<div class='titulo'><p style='color:#"+fielderCamp[i].campana.color+";'>"+fielderCamp[i].campana.titulo+"</p></div>"+
                "<div class='descripcion'><p>"+fielderCamp[i].campana.descripcion+"</p></div>"+
                "</div>"+
                "</div>";
            }


           }
        }
        function includes(k) {
          for(var i=0; i < this.length; i++){
            if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
              return true;
            }
          }
          return false;
        }
    }
  }
}
function masterLogin(){
  setTimeout(function(){
    $('#masterLogin').addClass('small').addClass('ani').fadeIn();
  },10);
  setTimeout(function(){
    $('#masterLogin').removeClass('small').addClass('end');
  },300);
}

$(document).on("blur", "input",function(){
//  $('input').blur(function(){
  var $this = $(this);
  if($this.val())
    $this.addClass('used');
  else
    $this.removeClass('used');
});

$(document).on("click",".riples",function(e){
  var es=$(this);
  var tama=es.parent().offset(),
      klas=es.attr('class'),
      circ=es.find('.ripplesCircle');
  var x=e.pageX-tama.left,
      y=e.pageY-tama.top;
  circ.css({top:y+'px',left:x+'px'});
  es.addClass('is-active');
  if(klas!='riples none') masterLogin();
  setTimeout(function(){
    es.removeClass('is-active');
  },500);
});

function printInfoUser(r){
  insert = document.getElementById('dns');
  if(!r.fecha){
    insert.innerHTML = '<div class="inner"><h3>Mensaje de Alerta:</h3>'+
      '<div class="url">'+r.mensaje+'</div>'+
    '</div>';
  }
  else{
    insert.innerHTML = '<div class="inner"><h3>Navegación de usuarios</h3>'+
      '<div class="telefono"><span>Teléfono:</span>'+r.telefono+'</div>'+
      '<div class="url"><span>URL:</span>'+r.url+'</div>'+
      '<div class="fecha"><span>Fecha:</span>'+r.fecha+'</div>'+
    '</div>';
  }
  insert.classList.add('open');
   setTimeout(function(){
    insert.classList.remove('open');
   }, 3000);
}


function iframeMethod(type){
  if(type == "closeIframe"){
    document.getElementById('iframeDisplay').classList.remove('open');
    document.getElementById('iframeDisplay2').classList.remove('open');
  }
  else{
     window.location.hash = '#'+type;
    insert = document.getElementById(type);
    if(!insert.classList.contains('open')){
      insert.classList.add('open');
    }
    else{
      insert.classList.remove('open');
      if(type == "iframeDisplay"){
        document.getElementById('iframeDisplay2').classList.remove('open');
        insert.innerHTML = '<iframe src="https://187.217.179.35:81/tcd/?fielder='+userId+'" allowtransparency="true"></iframe>';
      }
      if(type == "iframeDisplay2"){
         document.getElementById('iframeDisplay').classList.remove('open');
         insert.innerHTML = '<iframe src="https://187.217.179.35:81/tcd/?fielder='+userId+'" allowtransparency="true"></iframe>';
      }
    }
  }
}
function exReport(r){
  split = r[0].createAt.split('-'),
  regExp = /^0[0-9].*$/;
  for(var i = 0; i <= split.length-1; i++){
    if(regExp.test(split[i])){
       slice = split[i].split('');
       split[i] = slice[1];
    }
  }
  newObj = Calendar[split[0]][(parseInt(split[1])-1)][split[2]];
  if(!newObj.asignacion){
    newObj['asignacion'] ={},
    newObj.asignacion['Libres'] = {};
  }
  if(!newObj.asignacion.Libres){
    newObj.asignacion['Libres'] = {};
  }
  newObj = Calendar[split[0]][(parseInt(split[1])-1)][split[2]].asignacion.Libres;
  console.log(split[0],split[1],split[2]);
  newObj[ObjectSize(newObj)] = {},
  newObj[ObjectSize(newObj)-1]["nombre"] = r[0].nombre,
  newObj[ObjectSize(newObj)-1]["geo"] = r[0].latitud,r[0].longitud,
  newObj[ObjectSize(newObj)-1]["direccion"] = r[0].direccion;
  newObj[ObjectSize(newObj)-1]["status"] = r[0].pesco;
  newObj[ObjectSize(newObj)-1]["tipo"] = r[0].vivo;
  newObj[ObjectSize(newObj)-1]["distrito"] = "venta sin distrito";

  Calendar = JSON.stringify(Calendar);
  Calendar = localStorage.setItem('Calendar',Calendar);
  Calendar = JSON.parse( localStorage.getItem('Calendar'));
}
