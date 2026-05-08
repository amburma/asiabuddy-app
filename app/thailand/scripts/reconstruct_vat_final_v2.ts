import * as fs from 'fs';

const filePath = 'src/data/vatRefundGuide.ts';

const content = `import { ThaiLanguage } from '../types';

export const VAT_REFUND_GUIDE: Record<ThaiLanguage, string> = {
  myanmar: \`# ခရီးသွားများအတွက် VAT ပြန်အမ်းငွေ လမ်းညွှန်

---

## VAT ပြန်အမ်းငွေဆိုတာ ဘာလဲ?

နိုင်ငံအများစုသည် အဓိကအားဖြင့် ၎င်းတို့၏ နိုင်ငံသားများထံမှ အခွန်ကောက်ခံလေ့ရှိသည်။ နိုင်ငံခြား ခရီးသွားများသည် ထိုနိုင်ငံတွင် အခြေချနေထိုင်သူများ မဟုတ်သောကြောင့် ဝယ်ယူထားသော ကုန်ပစ္စည်းများအတွက် ပေးဆောင်ခဲ့ရသည့် **တန်ဖိုးမြှင့်အခွန် (VAT)** ကို ပြန်လည်ထုတ်ယူခွင့်ရှိသည်။

***အရေးကြီးသော မှတ်ချက်***: *စားသောက်စရိတ်များ၊ ဟိုတယ်ခများ သို့မဟုတ် ဝန်ဆောင်ခများအတွက် VAT ပြန်အမ်းငွေကို တောင်းခံ၍မရပါ။ ပြန်အမ်းငွေသည် နိုင်ငံပြင်ပသို့ ယူဆောင်သွားမည့် "ရုပ်ပိုင်းဆိုင်ရာ ကုန်ပစ္စည်းများ" အတွက်သာ အကျုံးဝင်ပါသည်။*

---

## အကျုံးဝင်မှု လိုအပ်ချက်များ

VAT ပြန်အမ်းငွေကို ရရှိရန်အတွက် အောက်ပါ သတ်မှတ်ချက်များနှင့် ကိုက်ညီရပါမည်-

*   **နိုင်ငံခြားသား အဆင့်အတန်း**: *သင်သည် ထိုနိုင်ငံတွင် နေထိုင်သူမဟုတ်သူ ဖြစ်ရမည်။ ထိုနိုင်ငံတွင် အမြဲတမ်းနေထိုင်ခွင့် ဗီဇာ သို့မဟုတ် အလုပ်လုပ်ကိုင်ခွင့် ပါမစ်ရှိသူ မဖြစ်ရပါ။*
*   **အနည်းဆုံး ဝယ်ယူမှု**: *ဆိုင်တစ်ဆိုင်တည်းတွင် တစ်ရက်အတွင်း သတ်မှတ်ထားသော အနည်းဆုံး ဝယ်ယူမှုပမာဏ (ဥပမာ- ထိုင်းနိုင်ငံတွင် ဘတ် ၂,၀၀၀) ပြည့်မီရမည်။*
*   **ခွင့်ပြုချက်ရ ဆိုင်များ**: *ဝယ်ယူမှုများကို "VAT Refund for Tourists" ဆိုင်းဘုတ် ပြသထားသော ဆိုင်များမှ ဝယ်ယူရမည်။*

---

## VAT ပြန်အမ်းငွေ တောင်းခံရန် အဆင့်များ

### အဆင့် ၁: ဆိုင်တွင် (ဝယ်ယူစဉ်အတွင်း)

ငွေပေးချေသည့်အခါ **VAT ပြန်အမ်းငွေ ဖောင်** တောင်းဆိုရန် သင်၏ **နိုင်ငံကူးလက်မှတ် (Passport)** ကို ပြသပါ။

ဆိုင်မှ သင့်အား **အခွန်ပြေစာ** နှင့်အတူ **VAT ပြန်အမ်းငွေ လျှောက်လွှာဖောင်** ကို ပေးပါလိမ့်မည်။

### အဆင့် ၂: လေဆိပ်တွင် (Check-in မဝင်မီ)

ခရီးဆောင်အိတ်များကို Check-in မဝင်မီ **အကောက်ခွန် စစ်ဆေးရေးရုံး (Customs Inspection Office)** သို့ သွားရပါမည်။

သင်၏ ဖောင်များပေါ်တွင် **အကောက်ခွန် တံဆိပ်တုံး** ရရှိရန် အရာရှိအား **နိုင်ငံကူးလက်မှတ်**၊ **ဖောင်များ** နှင့် **ဝယ်ယူထားသော ကုန်ပစ္စည်းများ** ကို ပြသပါ။

### အဆင့် ၃: လေဆိပ်အတွင်း (လူဝင်မှုကြီးကြပ်ရေး စစ်ဆေးပြီးနောက်)

လူဝင်မှုကြီးကြပ်ရေး စစ်ဆေးပြီး ထွက်ခွာဆောင်အတွင်းသို့ ရောက်ရှိသောအခါ **VAT ပြန်အမ်းငွေ ကောင်တာ (VAT Refund Counter)** သို့ သွားပါ။

ပြန်အမ်းငွေကို **လက်ငင်းငွေသား** ဖြင့်ဖြစ်စေ၊ **ခရက်ဒစ်ကတ်** သို့ ထည့်သွင်းခြင်းဖြင့်ဖြစ်စေ ရရှိရန် သင်၏ **တံဆိပ်တုံး ထုထားသော ဖောင်များ** ကို တင်ပြပါ။\`,\

  english: \`# VAT Refund Guide for Travelers

---

## What is a VAT Refund?

Most countries collect taxes primarily from their citizens. Since foreign tourists do not settle in the country, they are eligible for a refund on the **Value Added Tax (VAT)** paid on purchased goods.

***Important Note***: *You cannot claim a VAT refund for dining expenses, hotel fees, or service charges. Refunds are only applicable to "Physical Goods" that will be taken out of the country.*

---

## Eligibility Requirements

To qualify for a VAT refund, you must meet the following criteria:

*   **Foreign Status**: *You must be a non-resident. You cannot be a person holding a resident visa or a work permit in that country.*
*   **Minimum Purchase**: *You must meet the minimum spend requirement at a single store within a single day (e.g., 2,000 Baht in Thailand).*
*   **Authorized Stores**: *Purchases must be made from shops displaying the "VAT Refund for Tourists" sign.*

---

## Steps to Claim Your VAT Refund

### Step 1: At the Store (During Purchase)

When paying, present your **Passport** to request a **VAT Refund Form**. (Some stores may accept a passport copy).

The store will provide you with a **VAT Refund Application Form** (e.g., **P.P.10 Form** in Thailand) along with the **Tax Invoice**.

### Step 2: At the Airport (Before Check-in)

Before checking in your luggage, you must visit the **Customs Inspection Office**.

Show your **Passport**, **Forms**, and **Purchased Goods** to the officer to get a **Customs Stamp** on your forms.

***Critical Requirement***: *You cannot withdraw money without this stamp. High-value items (e.g., phones, watches, jewelry) are often inspected directly by the officer.*

### Step 3: Inside the Airport (After Immigration)

After passing through Immigration and entering the Departure Lounge, go to the **VAT Refund Counter**.

Submit your **stamped forms** to receive your refund in **Cash** or as a credit to your **Credit Card**.\`,\

  spanish: \`# Guía de reembolso de IVA para viajeros

---

## ¿Qué es el reembolso de IVA?

La mayoría de los países recaudan impuestos principalmente de sus ciudadanos. Dado que los turistas extranjeros no se establecen en el país, son elegibles para un reembolso del **Impuesto al Valor Agregado (IVA)** pagado por los bienes comprados.

***Nota importante***: *No puede reclamar un reembolso de IVA por gastos de comida, tarifas de hotel o cargos por servicio. Los reembolsos solo se aplican a "Bienes Físicos" que se sacarán del país.*

---

## Requisitos de elegibilidad

Para calificar para un reembolso de IVA, debe cumplir con los siguientes criterios:

*   **Estatus de extranjero**: *Debe ser no residente. No puede ser una persona que posea una visa de residente o un permiso de trabajo en ese país.*
*   **Compra mínima**: *Debe cumplir con el requisito de gasto mínimo en una sola tienda dentro de un solo día (por ejemplo, 2,000 baht en Tailandia).*
*   **Tiendas autorizadas**: *Las compras deben realizarse en tiendas que exhiban el cartel "VAT Refund for Tourists".*

---

## Pasos para reclamar su reembolso de IVA

### Paso 1: En la tienda (durante la compra)

Al pagar, presente su **Pasaporte** para solicitar un **Formulario de reembolso de IVA**.

La tienda le proporcionará un **Formulario de solicitud de reembolso de IVA** junto con la **Factura de impuestos**.

### Paso 2: En el aeropuerto (antes del check-in)

Antes de facturar su equipaje, debe visitar la **Oficina de Inspección de Aduanas (Customs Inspection Office)**.

Muestre su **Pasaporte**, **Formularios** y **Bienes comprados** al oficial para obtener un **Sello de Aduana** en sus formularios.

### Paso 3: Dentro del aeropuerto (después de inmigración)

Después de pasar por inmigración y entrar en la sala de salidas, vaya al **Mostrador de reembolso de IVA (VAT Refund Counter)**.

Entregue sus **formularios sellados** para recibir su reembolso en **Efectivo** o como un crédito en su **Tarjeta de Crédito**.\`,\

  french: \`# Guide de remboursement de la TVA pour les voyageurs

---

## Qu'est-ce qu'un remboursement de la TVA ?

La plupart des pays perçoivent des impôts principalement auprès de leurs citoyens. Comme les touristes étrangers ne s'installent pas dans le pays, ils ont droit à un remboursement de la **taxe sur la valeur ajoutée (TVA)** payée sur les biens achetés.

***Note importante***: *Vous ne pouvez pas demander de remboursement de TVA pour les frais de restauration, les frais d'hôtel ou les frais de service. Les remboursements ne s'appliquent qu'aux « biens physiques » qui seront emportés hors du pays.*

---

## Conditions d'éligibilité

Pour avoir droit à un remboursement de TVA, vous devez remplir les critères suivants :

*   **Statut d'étranger**: *Vous devez être non-résident. Vous ne pouvez pas être titulaire d'un visa de résident ou d'un permis de travail dans ce pays.*
*   **Achat minimum**: *Vous devez atteindre le montant minimum d'achat dans un seul magasin au cours d'une même journée (par exemple, 2 000 bahts en Thaïlande).*
*   **Magasins agréés**: *Les achats doivent être effectués dans des magasins affichant le panneau « VAT Refund for Tourists ».*

---

## Étapes pour demander votre remboursement de TVA

### Étape 1 : En magasin (lors de l'achat)

Lors du paiement, présentez votre **passeport** pour demander un **formulaire de remboursement de TVA**.

Le magasin vous remettra un **formulaire de demande de remboursement de TVA** accompagné de la **facture fiscale**.

### Étape 2 : À l'aéroport (avant l'enregistrement)

Avant d'enregistrer vos bagages, vous devez vous rendre au **bureau d'inspection des douanes (Customs Inspection Office)**.

Présentez votre **passeport**, vos **formulaires** et les **biens achetés** à l'officier pour obtenir un **cachet de la douane** sur vos formulaires.

### Étape 3 : Dans l'aéroport (après l'immigration)

Après avoir passé l'immigration et être entré dans la salle d'embarquement, rendez-vous au **guichet de remboursement de la TVA (VAT Refund Counter)**.

Remettez vos **formulaires tamponnés** pour recevoir votre remboursement en **espèces** ou sous forme de crédit sur votre **carte de crédit**.\`,\

  italian: \`# Guida al rimborso IVA per i viaggiatori

---

## Cos'è il rimborso IVA?

La maggior parte dei paesi riscuote tasse principalmente dai propri cittadini. Poiché i turisti stranieri non risiedono nel paese, hanno diritto a un rimborso dell'**Imposta sul Valore Aggiunto (IVA)** pagata sui beni acquistati.

***Nota importante***: *Non è possibile richiedere il rimborso IVA per spese di ristorazione, spese alberghiere o costi di servizio. Il rimborso si applica solo ai "beni fisici" che verranno portati fuori dal paese.*

---

## Requisiti di idoneità

Per avere diritto a un rimborso IVA, devi soddisfare i seguenti criteri:

*   **Status di straniero**: *Devi essere non residente. Non puoi essere in possesso di un visto di residenza o di un permesso di lavoro in quel paese.*
*   **Acquisto minimo**: *Devi soddisfare il requisito di spesa minima in un unico negozio nello stesso giorno (ad es. 2.000 Baht in Thailandia).*
*   **Negozi autorizzati**: *Gli acquisti devono essere effettuati presso negozi che espongono il cartello "VAT Refund for Tourists".*

---

## Passaggi per richiedere il rimborso IVA

### Passaggio 1: In negozio (al momento dell'acquisto)

Al momento del pagamento, presenta il tuo **passaporto** per richiedere il **modulo di rimborso IVA**.

Il negozio ti fornirà un **modulo di richiesta di rimborso IVA** insieme alla **fattura fiscale**.

### Passaggio 2: In aeroporto (prima del check-in)

Prima di spedire i bagagli, devi recarti presso l'**ufficio di ispezione doganale (Customs Inspection Office)**.

Mostra il tuo **passaporto**, i **moduli** e i **beni acquistati** all'ufficiale per ottenere il **timbro doganale** sui moduli.

### Passaggio 3: All'interno dell'aeroporto (dopo l'immigrazione)

Dopo aver superato l'immigrazione e aver effettuato l'accesso all'area partenze, recati allo **sportello per il rimborso IVA (VAT Refund Counter)**.

Consegna i tuoi **moduli timbrati** per ricevere il rimborso in **contanti** o come accredito sulla tua **carta di credito**.\`,\

  german: \`# Leitfaden zur Mehrwertsteuerrückerstattung für Reisende

---

## Was ist eine Mehrwertsteuerrückerstattung?

Die meisten Länder erheben Steuern hauptsächlich von ihren Bürgern. Da ausländische Touristen nicht im Land ansässig sind, haben sie Anspruch auf eine Erstattung der auf gekaufte Waren gezahlten **Mehrwertsteuer (MwSt)**.

***Wichtiger Hinweis***: *Sie können keine Mehrwertsteuerrückerstattung für Ausgaben für Restaurantbesuche, Hotelgebühren oder Servicegebühren beantragen. Erstattungen gelten nur für „physische Güter“, die aus dem Land ausgeführt werden.*

---

## Voraussetzungen für die Berechtigung

Um Anspruch auf eine Mehrwertsteuerrückerstattung zu haben, müssen Sie die folgenden Kriterien erfüllen:

*   **Ausländerstatus**: *Sie müssen ein Nicht-Ansässiger sein. Sie dürfen keine Person mit einem Visum für den Aufenthalt oder einer Arbeitserlaubnis in diesem Land sein.*
*   **Mindesteinkauf**: *Sie müssen den Mindestumsatz in einem einzigen Geschäft innerhalb eines Tages erreichen (z. B. 2.000 Baht in Thailand).*
*   **Autorisierte Geschäfte**: *Einkäufe müssen in Geschäften getätigt werden, die das Schild „VAT Refund for Tourists“ führen.*

---

## Schritte zur Beantragung Ihrer Mehrwertsteuerrückerstattung

### Schritt 1: Im Geschäft (beim Kauf)

Legen Sie beim Bezahlen Ihren **Reisepass** vor, um ein **Formular zur Mehrwertsteuerrückerstattung** anzufordern.

Das Geschäft händigt Ihnen ein **Antragsformular für die Mehrwertsteuerrückerstattung** zusammen mit der **Steuerrechnung** aus.

### Schritt 2: Am Flughafen (vor dem Check-in)

Bevor Sie Ihr Gepäck aufgeben, müssen Sie das **Zollinspektionsbüro (Customs Inspection Office)** aufsuchen.

Zeigen Sie dem Beamten Ihren **Reisepass**, die **Formulare** und die **gekauften Waren**, um einen **Zollstempel** auf Ihren Formularen zu erhalten.

### Schritt 3: Im Flughafen (nach der Passkontrolle)

Gehen Sie nach der Passkontrolle und dem Betreten der Abflughalle zum **Schalter für Mehrwertsteuerrückerstattung (VAT Refund Counter)**.

Reichen Sie Ihre **abgestempelten Formulare** ein, um Ihre Rückerstattung in **bar** oder als Gutschrift auf Ihrer **Kreditkarte** zu erhalten.\`,\

  portuguese: \`# Guia de Reembolso de IVA para Viajantes

---

## O que é um Reembolso de IVA?

A maioria dos países cobra impostos principalmente dos seus cidadãos. Uma vez que os turistas estrangeiros não se estabelecem no país, são elegíveis para um reembolso sobre o **Imposto sobre o Valor Acrescentado (IVA)** pago em bens adquiridos.

***Nota Importante***: *Não pode solicitar o reembolso de IVA para despesas com refeições, taxas de hotel ou taxas de serviço. Os reembolsos são aplicáveis apenas a "Bens Físicos" que serão levados para fora do país.*

---

## Requisitos de Elegibilidade

Para se qualificar para um reembolso de IVA, deve cumprir os seguintes critérios:

*   **Estatuto de Estrangeiro**: *Deve ser um não residente. Não pode ser uma pessoa titular de um visto de residente ou de uma autorização de trabalho nesse país.*
*   **Compra Mínima**: *Deve cumprir o requisito de gasto mínimo numa única loja dentro de um único dia (por exemplo, 2.000 Baht na Tailândia).*
*   **Lojas Autorizadas**: *As compras devem ser feitas em lojas que exibam o sinal "VAT Refund for Tourists".*

---

## Passos para Solicitar o Seu Reembolso de IVA

### Passo 1: Na Loja (Durante a Compra)

Ao pagar, apresente o seu **Passaporte** para solicitar um **Formulário de Reembolso de IVA**.

A loja fornecer-lhe-á um **Formulário de Pedido de Reembolso de IVA** juntamente com a **Fatura Fiscal**.

### Passo 2: No Aeroporto (Antes do Check-in)

Antes de despachar a sua bagagem, deve visitar o **Serviço de Inspeção Aduaneira (Customs Inspection Office)**.

Mostre o seu **Passaporte**, os **Formulários** e os **Bens Adquiridos** ao funcionário para obter um **Carimbo da Alfândega** nos seus formulários.

### Passo 3: Dentro do Aeroporto (Após o Controlo de Passaportes)

Depois de passar pelo controlo de passaportes e entrar na sala de embarque, dirija-se ao **Balcão de Reembolso de IVA (VAT Refund Counter)**.

Entregue os seus **formulários carimbados** para receber o seu reembolso em **Dinheiro** ou como um crédito no seu **Cartão de Crédito**.\`,\

  russian: \`# Руководство по возврату НДС для путешественников

---

## Что такое возврат НДС?

Большинство стран собирают налоги в первую очередь со своих граждан. Поскольку иностранные туристы не проживают в стране, они имеют право на возврат **налога на добавленную стоимость (НДС)**, уплаченного за купленные товары.

***Важное примечание***: *Вы не можете претендовать на возврат НДС за расходы на питание, проживание в отеле или обслуживание. Возврат распространяется только на «физические товары», которые будут вывезены из страны.*

---

## Требования для получения возврата

Чтобы иметь право на возврат НДС, вы должны соответствовать следующим критериям:

*   **Статус иностранца**: *Вы должны быть нерезидентом. Вы не можете быть лицом, имеющим резидентскую визу или разрешение на работу в этой стране.*
*   **Минимальная сумма покупки**: *Вы должны выполнить требование по минимальным расходам в одном магазине в течение одного дня (например, 2000 бат в Таиланде).*
*   **Авторизованные магазины**: *Покупки должны совершаться в магазинах с табличкой «VAT Refund for Tourists».*

---

## Шаги для получения возврата НДС

### Шаг 1: В магазине (во время покупки)

При оплате предъявите **паспорт**, чтобы запросить **форму возврата НДС**.

Магазин предоставит вам **форму заявления на возврат НДС** вместе с **налоговой накладной**.

### Шаг 2: В аэропорту (перед регистрацией)

Перед сдачей багажа необходимо посетить **офис таможенного досмотра (Customs Inspection Office)**.

Покажите офицеру свой **паспорт**, **формы** и **купленные товары**, чтобы получить **таможенный штамп** на ваших формах.

### Шаг 3: Внутри аэропорта (после паспортного контроля)

После прохождения паспортного контроля и входа в зал вылета обратитесь к **стойке возврата НДС (VAT Refund Counter)**.

Сдайте **формы с печатями**, чтобы получить возврат **наличными** или на свою **кредитную карту**.\`,\

  hebrew: \`# מדריך להחזרי מע"מ (VAT) למטיילים

---

## מהו החזר מע"מ?

רוב המדינות גובות מסים בעיקר מאזרחיהן. מכיוון שתיירים זרים אינם גרים במדינה, הם זכאים להחזר על **מס ערך מוסף (מע"מ)** ששולם על סחורות שנרכשו.

***הערה חשובה***: *אינך יכול לבקש החזר מע"מ על הוצאות אוכל, דמי מלון או דמי שירות. החזרים חלים רק על "מוצרים פיזיים" שיוצאו מהמדינה.*

---

## תנאי זכאות

כדי להיות זכאי להחזר מע"מ, עליך לעמוד בקריטריונים הבאים:

*   **סטטוס זר**: *עליך להיות תושב חוץ. אינך יכול להיות בעל ויזת תושב או היתר עבודה באותה מדינה.*
*   **רכישת מינימום**: *עליך לעמוד בדרישת ההוצאה המינימלית בחנות אחת ביום אחד (למשל, 2,000 באט בתאילנד).*
*   **חנויות מורשות**: *הרכישות חייבות להתבצע בחנויות המציגות את השלט "VAT Refund for Tourists".*

---

## שלבים לקבלת החזר המע"מ

### שלב 1: בחנות (בזמן הרכישה)

בעת התשלום, הצג את **הדרכון** שלך כדי לבקש **טופס החזר מע"מ**.

החנות תספק לך **טופס בקשה להחזר מע"מ** יחד עם **חשבונית המס**.

### שלב 2: בשדה התעופה (לפני הצ'ק-אין)

לפני מסירת הכבודה, עליך לבקר ב**משרד ביקורת המכס (Customs Inspection Office)**.

הצג את **הדרכון**, **הטפסים** ו**המוצרים שנרכשו** לפקיד כדי לקבל **חותמת מכס** על הטפסים שלך.

### שלב 3: בתוך שדה התעופה (אחרי ביקורת הדרכונים)

לאחר המעבר בביקורת הדרכונים וכניסה לאולם היוצאים, פנה ל**דלפק החזר המע"מ (VAT Refund Counter)**.

הגש את **הטפסים החתומים** כדי לקבל את ההחזר שלך ב**מזומן** או כזיכוי ל**כרטיס האשראي** שלך.\`,\

  chinese: \`# 旅客增值税退税指南

---

## 什么是增值税退税？

大多数国家主要向其公民征税。由于外国游客不在该国定居，他们有资格获得对所购商品支付的**增值税 (VAT)** 退税。

***重要提示***：*您不能申请餐饮费、酒店费或服务费的增值税退税。退税仅适用于将带离该国的“实物商品”。*

---

## 申请资格

要获得增值税退税资格，您必须满足以下标准：

*   **外国身份**：*您必须是非居民。您不能是在该国持有居民签证或工作许可证的人。*
*   **最低消费额**：*您必须在同一天在同一家商店满足最低消费要求（例如在泰国为 2,000 泰铢）。*
*   **授权商店**：*购物必须在贴有“VAT Refund for Tourists”标志的商店进行。*

---

## 申请增值税退税的步骤

### 第 1 步：在商店（购买时）

付款时，出示您的**护照**以索取**增值税退税表**。

商店将为您提供**增值税退税申请表**以及**税务发票**。

### 第 2 步：在机场（值机前）

在办理托运行李之前，您必须前往**海关检查处 (Customs Inspection Office)**。

向官员出示您的**护照**、**表格**和**购买的商品**，以便在您的表格上获得**海关盖章**。

### 第 3 步：机场内（过移民局后）

通过移民局并进入离境大厅后，前往**增值税退税柜台 (VAT Refund Counter)**。

提交您的**盖章表格**，以通过**现金**或存入您的**信用卡**获得退税。\`,\

  malay: \`# Panduan Bayaran Balik VAT untuk Pelancong

---

## Apakah itu Bayaran Balik VAT?

Kebanyakan negara mengutip cukai terutamanya daripada warganegara mereka. Oleh kerana pelancong asing tidak menetap di negara tersebut, mereka layak mendapat bayaran balik **Cukai Tambah Nilai (VAT)** yang dibayar ke atas barangan yang dibeli.

***Nota Penting***: *Anda tidak boleh menuntut bayaran balik VAT untuk perbelanjaan makan, yuran hotel atau caj perkhidmatan. Bayaran balik hanya terpakai untuk "Barangan Fizikal" yang akan dibawa keluar dari negara tersebut.*

---

## Syarat Kelayakan

Untuk layak mendapat bayaran balik VAT, anda mesti memenuhi kriteria berikut:

*   **Status Warganegara Asing**: *Anda mestilah seorang pemastautin bukan tetap. Anda tidak boleh menjadi orang que memegang visa pemastautin atau permit kerja di negara tersebut.*
*   **Pembelian Minimum**: *Anda mesti memenuhi syarat perbelanjaan minimum di satu kedai dalam satu hari (cth., 2,000 Baht di Thailand).*
*   **Kedai Sah**: *Pembelian mestilah dibuat dari kedai yang memaparkan tanda "VAT Refund for Tourists".*

---

## Langkah-langkah untuk Menuntut Bayaran Balik VAT Anda

### Langkah 1: Di Kedai (Semasa Pembelian)

Semasa membayar, tunjukkan **Pasport** anda untuk meminta **Borang Bayaran Balik VAT**.

Kedai akan memberikan anda **Borang Permohonan Bayaran Balik VAT** bersama dengan **Invois Cukai**.

### Langkah 2: Di Lapangan Terbang (Sebelum Daftar Masuk)

Sebelum mendaftar masuk bagasi anda, anda mesti melawat **Pejabat Pemeriksaan Kastam (Customs Inspection Office)**.

Tunjukkan **Pasport**, **Borang**, dan **Barangan yang Dibeli** kepada pegawai untuk mendapatkan **Setem Kastam** pada borang anda.

***Keperluan Penting***: *Anda tidak boleh mengeluarkan wang tanpa setem ini. Barangan bernilai tinggi (cth., telefon, jam tangan, barang kemas) selalunya diperiksa secara langsung oleh pegawai.*

### Langkah 3: Di Dalam Lapangan Terbang (Selepas Imigresen)

Selepas melalui Imigresen dan memasuki Lounge Pelepasan, pergi ke **Kaunter Bayaran Balik VAT (VAT Refund Counter)**.

Serahkan **borang yang telah disetem** untuk menerima bayaran balik anda dalam bentuk **Tunai** atau sebagai kredit ke **Kad Kredit** anda.\`,\

  indonesian: \`# Panduan Pengembalian Dana PPN (VAT Refund) untuk Wisatawan

---

## Apa itu Pengembalian Dana PPN?

Sebagian besar negara memungut pajak terutama dari warga negaranya. Karena wisatawan asing tidak menetap di negara tersebut, mereka berhak mendapatkan pengembalian dana atas **Pajak Pertambahan Nilai (PPN)** yang dibayarkan atas barang yang dibeli.

***Catatan Penting***: *Anda tidak dapat mengklaim pengembalian dana PPN untuk biaya makan, biaya hotel, atau biaya layanan. Pengembalian dana hanya berlaku untuk "Barang Fisik" yang akan dibawa keluar dari negara tersebut.*

---

## Syarat Kelayakan

Untuk memenuhi syarat pengembalian dana PPN, Anda harus memenuhi kriteria berikut:

*   **Status Warga Negara Asing**: *Anda harus merupakan penduduk non-menetap. Anda tidak boleh merupakan orang yang memegang visa penduduk atau izin kerja di negara tersebut.*
*   **Minimal Pembelian**: *Anda harus memenuhi syarat minimal belanja di satu toko dalam satu hari (misalnya, 2.000 Baht di Thailand).*
*   **Toko Berizin**: *Pembelian harus dilakukan di toko yang memasang tanda "VAT Refund for Tourists".*

---

## Langkah-langkah Mengklaim Pengembalian Dana PPN Anda

### Langkah 1: Di Toko (Saat Pembelian)

Saat membayar, tunjukkan **Paspor** Anda untuk meminta **Formulir Pengembalian Dana PPN**.

Toko akan memberi Anda **Formulir Aplikasi Pengembalian Dana PPN** beserta **Faktur Pajak**.

### Langkah 2: Di Bandara (Sebelum Check-in)

Sebelum menitipkan bagasi, Anda harus mengunjungi **Kantor Inspeksi Bea Cukai (Customs Inspection Office)**.

Tunjukkan **Paspor**, **Formulir**, dan **Barang yang Dibeli** kepada petugas untuk mendapatkan **Stempel Bea Cukai** pada formulir Anda.

***Persyaratan Penting***: *Anda tidak dapat menarik uang tanpa stempel ini. Barang-barang bernilai tinggi (misalnya ponsel, jam tangan, perhiasan) sering kali diperiksa langsung oleh petugas.*

### Langkah 3: Di Dalam Bandara (Setelah Imigrasi)

Setelah melewati Imigrasi dan memasuki Ruang Keberangkatan, pergilah ke **Loket Pengembalian Dana PPN (VAT Refund Counter)**.

Serahkan **formulir yang telah distempel** untuk menerima pengembalian dana Anda dalam bentuk **Tunai** atau sebagai kredit ke **Kartu Kredit** Anda.\`,\

  hindi: \`# यात्रियों के लिए वैट रिफंड गाइड

---

## वैट रिफंड क्या है?

अधिकांश देश मुख्य रूप से अपने नागरिकों से कर एकत्र करते हैं। चूंकि विदेशी पर्यटक देश में नहीं बसते हैं, इसलिए वे खरीदे गए सामान पर भुगतान किए गए **मूल्य वर्धित कर (VAT)** पर रिफंड के पात्र हैं।

***महत्वपूर्ण नोट***: *आप भोजन के खर्च, होटल शुल्क या सेवा शुल्क के लिए वैट रिफंड का दावा नहीं कर सकते। रिफंड केवल "भौतिक वस्तुओं" पर लागू होता है जिन्हें देश से बाहर ले जाया जाएगा।*

---

## पात्रता आवश्यकताएँ

वैट रिफंड के लिए अर्हता प्राप्त करने के लिए, आपको निम्नलिखित मानदंडों को पूरा करना होगा:

*   **विदेशी स्थिति**: *आपको एक गैर-निवासी होना चाहिए। आप उस देश में निवासी वीजा या वर्क परमिट रखने वाले व्यक्ति नहीं हो सकते।*
*   **न्यूनतम खरीदारी**: *आपको एक दिन के भीतर एक ही स्टोर में न्यूनतम खर्च की आवश्यकता (जैसे, थाईलैंड में 2,000 baht) को पूरा करना होगा।*
*   **अधिकृत स्टोर**: *खरीदारी उन दुकानों से की जानी चाहिए जिनमें "VAT Refund for Tourists" का साइन लगा हो।*

---

## आपके वैट रिफंड का दावा करने के चरण

### चरण 1: स्टोर पर (खरीदारी के दौरान)

भुगतान करते समय, **वैट रिफंड फॉर्म** के लिए अनुरोध करने के लिए अपना **पासपोर्ट** प्रस्तुत करें।

स्टोर आपको **टैक्स इनवॉइस** के साथ **वैट रिफंड आवेदन फॉर्म** प्रदान करेगा।

### चरण 2: हवाई अड्डे पर (चेक-इन से पहले)

अपने सामान चेक-इन करने से पहले, आपको **सीमा शुल्क निरीक्षण कार्यालय (Customs Inspection Office)** पर जाना होगा।

अपने फॉर्म पर **सीमा शुल्क स्टैम्प** प्राप्त करने के लिए अधिकारी को अपना **पासपोर्ट**, **फॉर्म**, और **खरीदा गया सामान** दिखाएं।

### चरण 3: हवाई अड्डे के अंदर (इमिग्रेशन के बाद)

इमिग्रेशन से गुजरने और डिपार्चर लाउंज में प्रवेश करने के बाद, **वैट रिफंड काउंटर (VAT Refund Counter)** पर जाएं।

अपने रिफंड को **नकद** या अपने **क्रेडिट कार्ड** में प्राप्त करने के लिए अपने **स्टैम्प लगे फॉर्म** जमा करें।\`,\

  japanese: \`# 旅行者のためのVAT還付ガイド

---

## VAT還付とは何ですか？

ほとんどの国では、主に自国民から税金を徴収しています。外国人観光客はその国に定住しないため、購入した物品に対して支払った**付加価値税（VAT）**の還付を受ける権利があります。

***重要な注意点***：*食事代、宿泊代、サービス料についてはVAT還付を申請できません。還付は国外に持ち出す「物理的な物品」のみに適用されます。*

---

## 受給資格

VAT還付を受けるには、以下の基準を満たす必要があります。

*   **外国人ステータス**：*非居住者である必要があります。その国の居住ビザや労働許可証を所持している方は対象外です。*
*   **最低購入金額**：*1日1店舗あたりの最低購入金額（例：タイでは2,000バーツ）を満たす必要があります。*
*   **認定店舗**：*「VAT Refund for Tourists」の標識が掲示されている店舗で購入する必要があります。*

---

## VAT還付を請求する手順

### ステップ1：店舗にて（購入時）

支払いの際、**パスポート**を提示して**VAT還付請求書**を依頼してください。

店舗から**付加価値税還付申請書**と**税金請求書**が渡されます。

### ステップ2：空港にて（チェックイン前）

荷物を預ける前に、**税関検査室（Customs Inspection Office）**を訪れる必要があります。

係員に**パスポート**、**申請書**、**購入した物品**を提示し、申請書に**税関スタンプ**をもらってください。

***重要な要件***：*このスタンプがないと、還付金を受け取ることはできません。高額商品（携帯電話、時計、宝石など）は、係員によって直接検査されることがよくあります。*

### ステップ3：空港内（出国審査後）

出国審査を通過して出発ラウンジに入ったら、**VAT還付カウンター（VAT Refund Counter）**へ向かってください。

**スタンプ済みの申請書**を提出し、**現金**または**クレジットカード**への返金を受けてください。\`,\

  korean: \`# 여행자를 위한 부가세(VAT) 환급 안내

---

## 부가세 환급이란 무엇인가요?

대부분의 국가는 주로 자국민으로부터 세금을 징수합니다. 외국인 관광객은 해당 국가에 거주하지 않으므로, 구매한 물품에 대해 지불한 **부가가치세(VAT)**를 환급받을 권리가 있습니다.

***중요 참고 사항***: *식사 비용, 호텔 숙박비 또는 서비스 요금에 대해서는 부가세 환급을 청구할 수 없습니다. 환급은 해당 국가 밖으로 반출할 "실물 상품"에 대해서만 적용됩니다.*

---

## 자격 요건

부가세 환급을 받으려면 다음 기준을 충족해야 합니다.

*   **외국인 신분**: *비거주자여야 합니다. 해당 국가의 거주 비자나 노동 허가증을 소지한 사람은 대상에서 제외됩니다.*
*   **최소 구매 금액**: *하루 한 매장에서의 최소 구매 금액(예: 태국의 경우 2,000바트)을 충족해야 합니다.*
*   **지정 매장**: *"VAT Refund for Tourists" 표지판이 있는 매장에서 구매해야 합니다.*

---

## 부가세 환급 청구 절차

### 1단계: 매장에서 (구매 시)

결제 시, **여권**을 제시하고 **부가세 환급 양식**을 요청하세요.

매장에서 **세금 계산서**와 함께 **부가세 환급 신청서**를 제공합니다.

### 2단계: 공항에서 (체크인 전)

수하물을 부치기 전에 **세관 검사소(Customs Inspection Office)**를 방문해야 합니다.

**여권**, **환급 양식**, **구매한 물품**을 세관원에게 보여주고 양식에 **세관 확인 도장**을 받으세요.

***중요 사항***: *이 확인 도장이 없으면 환급금을 받을 수 없습니다. 고가 품목(휴대폰, 시계, 보석 등)은 세관원이 직접 확인하는 경우가 많습니다.*

### 3단계: 공항 내부 (출국 심사 후)

출국 심사를 마치고 면세 구역에 들어간 후, **부가세 환급 카운터(VAT Refund Counter)**를 찾으세요.

**도장이 찍힌 양식**을 제출하고 **현금**으로 받거나 **신용카드**로 환급받으세요.\`,\

  thai: \`# คู่มือการขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) สำหรับนักท่องเที่ยว

---

## การขอคืนภาษีมูลค่าเพิ่มคืออะไร?

ประเทศส่วนใหญ่จัดเก็บภาษีจากพลเมืองของตนเป็นหลัก เนื่องจากนักท่องเที่ยวต่างชาติไม่ได้พำนักอาศัยอยู่ในประเทศ จึงมีสิทธิ์ได้รับคืน **ภาษีมูลค่าเพิ่ม (VAT)** ที่ชำระแล้วสำหรับสินค้าที่ซื้อ

***หมายเหตุสำคัญ***: *คุณไม่สามารถขอคืนภาษี VAT สำหรับค่าอาหาร ค่าโรงแรม หรือค่าบริการได้ การคืนภาษีมีผลเฉพาะกับ "สินค้าที่เป็นวัตถุ" ที่จะนำออกนอกประเทศเท่านั้น*

---

## คุณสมบัติผู้มีสิทธิ์ขอคืนภาษี

เพื่อให้มีคุณสมบัติในการขอคืนภาษี คุณต้องเป็นไปตามเกณฑ์ดังต่อไปนี้:

*   **สถานะชาวต่างชาติ**: *คุณต้องเป็นผู้ที่ไม่พำนักอาศัยในประเทศ (Non-resident) คุณต้องไม่เป็นผู้ถือวีซ่าพำนักอาศัยหรือใบอนุญาตทำงานในประเทศนั้น*
*   **ยอดซื้อขั้นต่ำ**: *คุณต้องมียอดซื้อขั้นต่ำตามที่กำหนด ณ ร้านค้าเพียงแห่งเดียวภายในหนึ่งวัน (เช่น 2,000 บาท ในประเทศไทย)*
*   **ร้านค้าที่ได้รับอนุญาต**: *สินค้าต้องซื้อจากร้านค้าที่มีป้ายแสดง "VAT Refund for Tourists"*

---

## ขั้นตอนการขอคืนภาษีมูลค่าเพิ่มของคุณ

### ขั้นตอนที่ 1: ที่ร้านค้า (ขณะซื้อสินค้า)

ขณะชำระเงิน ให้แสดง **พาสปอร์ต** ของคุณเพื่อขอ **แบบฟอร์มขอคืนภาษี**

ทางร้านจะให้ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** พร้อมกับ **ใบกำกับภาษี**

### ขั้นตอนที่ 2: ที่สนามบิน (ก่อนเช็คอิน)

ก่อนเช็คอินกระเป๋าเดินทาง คุณต้องไปที่ **สำนักงานตรวจศุลกากร (Customs Inspection Office)**

แสดง **พาสปอร์ต**, **แบบฟอร์ม**, และ **สินค้าที่ซื้อ** ต่อเจ้าหน้าที่เพื่อรับ **ตราประทับศุลกากร** ลงในแบบฟอร์มของคุณ

### ขั้นตอนที่ 3: ภายในสนามบิน (หลังผ่านด่านตรวจคนเข้าเมือง)

หลังจากผ่านด่านตรวจคนเข้าเมืองและเข้าสู่ห้องรับรองผู้โดยสารขาออกแล้ว ให้ไปที่ **เคาน์เตอร์คืนภาษีมูลค่าเพิ่ม (VAT Refund Counter)**

ยื่น **แบบฟอร์มที่มีตราประทับ** เพื่อรับเงินคืนเป็น **เงินสด** หรือคืนเข้า **บัตรเครดิต** ของคุณ\`,\

  farsi: \`# راهنمای استرداد مالیات بر ارزش افزوده (VAT Refund) برای مسافران

---

## استرداد مالیات بر ارزش افزوده چیست؟

اکثر کشورها مالیات را عمدتاً از شهروندان خود جمع‌آوری می‌کنند. از آنجایی که گردشگران خارجی در کشور اقامت ندارند، واجد شرایط دریافت استرداد **مالیات بر ارزش افزوده (VAT)** پرداخت شده برای کالاهای خریداری شده هستند.

***نکته مهم***: *شما نمی‌توانید برای هزینه‌های غذا، هزینه‌های هتل یا هزینه‌های خدمات، درخواست استرداد مالیات کنید. استرداد فقط برای «کالاهای فیزیکی» که از کشور خارج می‌شوند اعمال می‌شود.*

---

## شرایط واجد شرایط بودن

برای واجد شرایط شدن برای استرداد مالیات، باید معیارهای زیر را داشته باشید:

*   **وضعیت غیر مقیم**: *شما نباید مقیم کشور باشید. نباید ویزای اقامت یا اجازه کار داشته باشید.*
*   **حداقل خرید**: *باید حداقل مبلغ خرید در یک فروشگاه در یک روز را رعایت کنید (مثلاً ۲۰۰۰ بات در تایلند).*
*   **فروشگاه‌های مجاز**: *خرید باید از فروشگاه‌هایی انجام شود که دارای علامت «VAT Refund for Tourists» هستند.*

---

## مراحل درخواست استرداد مالیات

### مرحله ۱: در فروشگاه (هنگام خرید)

هنگام پرداخت، **پاسپورت** خود را برای درخواست **فرم استرداد مالیات** ارائه دهید.

فروشگاه به شما یک **فرم درخواست استرداد مالیات** همراه با **فاکتور مالیاتی** می‌دهد.

### مرحله ۲: در فرودگاه (قبل از تحویل بار)

قبل از تحویل چمدان‌ها، باید به **دفتر بازرسی گمرک (Customs Inspection Office)** مراجعه کنید.

پاسپورت، فرم‌ها و کالاهای خریداری شده را به افسر نشان دهید تا **مهر گمرک** را روی فرم‌های خود دریافت کنید.

### مرحله ۳: داخل فرودگاه (بعد از کنترل گذرنامه)

پس از عبور از کنترل گذرنامه، به **باجه استرداد مالیات (VAT Refund Counter)** مراجعه کنید.

فرم‌های مهر شده خود را تحویل دهید تا استرداد خود را به صورت **نقدی** یا اعتبار در **کارت اعتباری** دریافت کنید.\`,\

  polish: \`# Przewodnik po zwrocie podatku VAT dla podróżnych

---

## Co to jest zwrot podatku VAT?

Większość krajów pobiera podatki głównie od swoich obywateli. Ponieważ zagraniczni turyści nie osiedlają się w kraju, są oni uprawnieni do zwrotu **podatku od wartości dodanej (VAT)** zapłaconego od zakupionych towarów.

***Ważna uwaga***: *Nie można ubiegać się o zwrot podatku VAT za wydatki na posiłki, opłaty hotelowe lub opłaty serwisowe. Zwroty dotyczą wyłącznie „towarów fizycznych”, które zostaną wywiezione z kraju.*

---

## Wymagania dotyczące kwalifikowalności

Aby zakwalifikować się do zwrotu podatku VAT, należy spełnić następujące kryteria:

*   **Status obcokrajowca**: *Musisz być niemeldowanym gościem. Nie możesz posiadać wizy rezydenta ani pozwolenia na pracę w tym kraju.*
*   **Minimalny zakup**: *Musisz spełnić wymóg minimalnych wydatków w jednym sklepie v ciągu jednego dnia (np. 2000 bahtów w Tajlandii).*
*   **Autoryzowane sklepy**: *Zakupy muszą być dokonywane w sklepach oznaczonych znakiem „VAT Refund for Tourists”.*

---

## Kroki ubiegania się o zwrot podatku VAT

### Krok 1: W sklepie (podczas zakupu)

Podczas płacenia okaż **Paszport**, aby poprosić o **Formularz zwrotu podatku VAT**.

Sklep przekaże Ci **Formularz wniosku o zwrot podatku VAT** wraz z **fakturą podatkową**.

### Krok 2: Na lotnisku (pred odprawą)

Przed nadaniem bagażu należy udać się do **Biura Inspekcji Celnej (Customs Inspection Office)**.

Okaż urzędnikowi paszport, formularze i zakupione towary, aby uzyskać **pieczątkę celną** na formularzach.

### Krok 3: Wewnątrz lotniska (po kontroli paszportowej)

Po przejściu przez kontrolę paszportową udaj się do **punktu zwrotu podatku VAT (VAT Refund Counter)**.

Złóż opieczętowane formularze, aby otrzymać zwrot w **gotówce** lub na **kartę kredytową**.\`,\

  vietnamese: \`# Hướng dẫn hoàn thuế VAT cho khách du lịch

---

## Hoàn thuế VAT là gì?

Hầu hết các quốc gia thu thuế chủ yếu từ công dân của họ. Vì khách du lịch nước ngoài không định cư trong nước nên họ đủ điều kiện được hoàn lại **Thuế giá trị gia tăng (VAT)** đã trả cho hàng hóa đã mua.

***Lưu ý quan trọng***: *Bạn không thể yêu cầu hoàn thuế VAT cho chi phí ăn uống, phí khách sạn hoặc phí dịch vụ. Hoàn thuế chỉ áp dụng cho "Hàng hóa vật chất" sẽ được mang ra khỏi đất nước.*

---

## Yêu cầu về điều kiện

Để đủ điều kiện được hoàn thuế VAT, bạn phải đáp ứng các tiêu chí sau:

*   **Tình trạng người nước ngoài**: *Bạn phải là người không cư trú. Bạn không thể là người có thị thực cư trú hoặc giấy phép làm việc tại quốc gia đó.*
*   **Mua tối thiểu**: *Bạn phải đáp ứng yêu cầu chi tiêu tối thiểu tại một cửa hàng trong một ngày (ví dụ: 2.000 Baht ở Thái Lan).*
*   **Cửa hàng được ủy quyền**: *Hàng hóa phải được mua từ các cửa hàng có dán bảng "VAT Refund for Tourists".*

---

## Các bước để nhận hoàn thuế VAT của bạn

### Bước 1: Tại cửa hàng (Khi mua hàng)

Khi thanh toán, hãy xuất trình **Hộ chiếu** của bạn để yêu cầu **Mẫu hoàn thuế VAT**.

Cửa hàng sẽ cung cấp cho bạn **Mẫu đơn đăng ký hoàn thuế VAT** cùng với **Hóa đơn thuế**.

### Bước 2: Tại sân bay (Trước khi làm thủ tục)

Trước khi ký gửi hành lý, bạn phải đến **Văn phòng Kiểm tra Hải quan (Customs Inspection Office)**.

Xuất trình **Hộ chiếu**, **Biểu mẫu** và **Hàng hóa đã mua** cho cán bộ để được đóng **Dấu hải quan** vào biểu mẫu của bạn.

### Bước 3: Bên trong sân bay (Sau khi nhập cảnh)

Sau khi làm thủ tục nhập cảnh và vào Phòng chờ khởi hành, hãy đến **Quầy hoàn thuế VAT (VAT Refund Counter)**.

Nộp các **mẫu đơn đã đóng dấu** để nhận tiền hoàn lại bằng **Tiền mặt** hoặc dưới dạng chuyển khoản vào **Thẻ tín dụng** của bạn.\`,\

  arabic: \`# دليل استرداد ضريبة القيمة المضافة للمسافرين

---

## ما هو استرداد ضريبة القيمة المضافة؟

تقوم معظم الدول بجمع الضرائب بشكل أساسي من مواطنيها. وبما أن السياح الأجانب لا يستقرون في البلاد، فهم مؤهلون لاسترداد **ضريبة القيمة المضافة (VAT)** المدفوعة على السلع المشتراة.

***ملاحظة مهمة***: *لا يمكنك المطالبة باسترداد ضريبة القيمة المضافة لنفقات الطعام أو رسوم الفنادق أو رسوم الخدمة. ينطبق الاسترداد فقط على "السلع المادية" التي سيتم إخراجها من البلاد.*

---

## شروط الاستحقاق

لكي تكون مؤهلاً لاسترداد ضريبة القيمة المضافة، يجب عليك استيفاء المعايير التالية:

*   **الحالة الأجنبية**: *يجب أن تكون غير مقيم. لا يمكنك أن تكون شخصاً يحمل تأشيرة إقامة أو تصريح عمل في ذلك البلد.*
*   **الحد الأدنى للشراء**: *يجب عليك استيفاء الحد الأدنى للإنفاق في متجر واحد خلال يوم واحد (على سبيل المثال، 2,000 باهت في تايلاند).*
*   **المتاجر المعتمدة**: *يجب إجراء المشتريات من المتاجر التي تعرض علامة "VAT Refund for Tourists".*

---

## خطوات المطالبة باسترداد ضريبة القيمة المضافة

### الخطوة 1: في المتجر (أثناء الشراء)

عند الدفع، قدم **جواز سفرك** لطلب **نموذج استرداد ضريبة القيمة المضافة**.

سيزودك المتجر بـ **نموذج طلب استرداد ضريبة القيمة المضافة** مع **الفاتورة الضريبية**.

### الخطوة 2: في المطار (قبل تسجيل الوصول)

قبل تسجيل أمتعتك، يجب عليك زيارة **مكتب تفتيش الجمارك (Customs Inspection Office)**.

أظهر **جواز سفرك** و**النماذج** و**البضائع المشتراة** للموظف للحصول على **ختم الجمارك** على نماذجك.

### الخطوة 3: داخل المطار (بعد الجوازات)

بعد المرور عبر قسم الجوازات ودخول صالة المغادرة، توجه إلى **كاونتر استرداد ضريبة القيمة المضافة (VAT Refund Counter)**.

قم بتسليم **النماذج المختومة** لاستلام مبلغ الاسترداد **نقداً** أو كائتمان في **بطاقتك الائتمانية**.\`,\

  bengali: \`# ভ্রমণকারীদের জন্য ভ্যাট (VAT) রিফান্ড গাইড

---

## ভ্যাট (VAT) রিফান্ড কী?

অধিকাংশ দেশ মূলত তাদের নাগরিকদের কাছ থেকে কর সংগ্রহ করে। যেহেতু বিদেশী পর্যটকরা দেশে স্থায়ীভাবে বসবাস করেন না, তাই তারা কেনা পণ্যের ওপর পরিশোধিত **মূল্য সংযোজন কর (VAT)** রিফান্ড পাওয়ার যোগ্য।

***গুরুত্বপূর্ণ নোট***: *আপনি খাবার খরচ, হোটেল ফি বা সার্ভিস চার্জের জন্য ভ্যাট রিফান্ড দাবি করতে পারবেন না। রিফান্ড কেবল সেই "ভৌত পণ্যগুলোর" জন্য প্রযোজ্য যা দেশের বাইরে নিয়ে যাওয়া হবে।*

---

## যোগ্যতার প্রয়োজনীয়তা

ভ্যাট রিফান্ডের যোগ্য হতে আপনাকে নিম্নলিখিত শর্তগুলো পূরণ করতে হবে:

*   **বিদেশী স্ট্যাটাস**: *আপনাকে একজন অনাবাসী (Non-resident) হতে হবে। আপনি সেই দেশে রেসিডেন্ট ভিসা বা ওয়ার্ক পারমিটধারী হতে পারবেন না।*
*   **ন্যূনতম কেনাকাটা**: *আপনাকে একদিনে একটি নির্দিষ্ট দোকানে ন্যূনতম কেনাকাটার পরিমাণ (যেমন থাইল্যান্ডে ২,০০০ বাত) পূরণ করতে হবে।*
*   **অনুমোদিত দোকান**: *কেনাকাটা অবশ্যই সেইসব দোকান থেকে করতে হবে যেখানে "VAT Refund for Tourists" সাইনটি প্রদর্শিত আছে।*

---

## আপনার ভ্যাট রিফান্ড দাবি করার ধাপসমূহ

### ধাপ ১: দোকানে (কেনাকাটার সময়)

পেমেন্ট করার সময়, **ভ্যাট রিফান্ড ফর্ম** অনুরোধ করতে আপনার **পাসপোর্ট** দেখান।

দোকান আপনাকে **ট্যাক্স ইনভয়েস** সহ একটি **ভ্যাট রিফান্ড আবেদন ফর্ম** প্রদান করবে।

### ধাপ ২: বিমানবন্দরে (চেক-ইন করার আগে)

আপনার লাগেজ চেক-ইন করার আগে, আপনাকে **কাস্টমস ইন্সপেকশন অফিসে (Customs Inspection Office)** যেতে হবে।

আপনার ফর্মে **কাস্টমস স্ট্যাম্প** পেতে কর্মকর্তাকে আপনার **পাসপোর্ট**, **ফর্ম** এবং **কেনা পণ্যগুলো** দেখান।

### ধাপ ৩: বিমানবন্দরের ভেতরে (ইমিগ্রেশনের পরে)

ইমিগ্রেশন পার হয়ে ডিপারচার লাউঞ্জে প্রবেশ করার পর, **ভ্যাট রিفান্ড কাউন্টারে (VAT Refund Counter)** যান।

আপনার রিফান্ড **নগদ** বা আপনার **ক্রেডিট কার্ডে** পেতে আপনার **স্ট্যাম্পযুক্ত ফর্মগুলো** জমা দিন।\`,\

  dutch: \`# Btw-teruggavegids voor reizigers

---

## Wat is een btw-teruggave?

De meeste landen innen voornamelijk belastingen van hun eigen burgers. Aangezien buitenlandse toeristen zich niet in het land vestigen, komen zij in aanmerking voor een teruggave van de **belasting over de toegevoegde waarde (btw)** die is betaald over gekochte goederen.

***Belangrijke opmerking***: *U kunt geen btw-teruggave claimen voor dinerkosten, hotelkosten of servicekosten. Teruggaven zijn alleen van toepassing op "fysieke goederen" die het land worden uitgevoerd.*

---

## Toelatingsvoorwaarden

Om in aanmerking te komen voor een btw-teruggave, moet u aan de volgende criteria voldoen:

*   **Buitenlandse status**: *U moet een niet-ingezetene zijn. U mag geen persoon zijn met een verblijfsvisum of een werkvergunning in dat land.*
*   **Minimale aankoop**: *U moet voldoen aan de minimale bestedingsvereiste bij een enkele winkel binnen één dag (bijv. 2.000 Baht in Thailand).*
*   **Geautoriseerde winkels**: *Aankopen moeten worden gedaan bij winkels die het bord "VAT Refund for Tourists" tonen.*

---

## Stappen om uw btw-teruggave te claimen

### Stap 1: In de winkel (tijdens de aankoop)

Toon bij het betalen uw **paspoort** om een **btw-teruggaveformulier** aan te vragen.

De winkel verstrekt u een **aanvraagformulier voor btw-teruggave** samen met de **belastingfactuur**.

### Stap 2: Op de luchthaven (vóór het inchecken)

Voordat u uw bagage incheckt, moet u naar het **douane-inspectiekantoor (Customs Inspection Office)** gaan.

Toon uw **paspoort**, **formulieren** en **gekochte goederen** aan de ambtenaar om een **douanestempel** op uw formulieren te krijgen.

### Stap 3: Binnen de luchthaven (na de immigratie)

Nadat u de immigratie bent gepasseerd en de vertrekhal bent binnengegaan, gaat u naar de **btw-teruggavebalie (VAT Refund Counter)**.

Lever uw **gestempelde formulieren** in om uw teruggave in **contanten** of als tegoed op uw **creditcard** te ontvangen.\`,\

  filipino: \`# VAT Refund Guide for Travelers

---

## Ano ang VAT Refund?

Karamihan sa mga bansa ay nangongolekta ng buwis pangunahin mula sa kanilang mga mamamayan. Dahil ang mga dayuhang turista ay hindi naninirahan sa bansa, sila ay karapat-dapat para sa refund sa **Value Added Tax (VAT)** na binayaran sa mga biniling produkto.

***Mahalagang Paalala***: *Hindi ka maaaring mag-claim ng VAT refund para sa mga gastos sa pagkain, bayad sa hotel, o service charges. Ang mga refund ay nalalapat lamang sa "Physical Goods" na ilalabas ng bansa.*

---

## Mga Kinakailangan sa Pagiging Karapat-dapat

Upang maging kwalipikado para sa isang VAT refund, dapat mong matugunan ang mga sumusunod na kriteria:

*   **Dayuhang Katayuan**: *Dapat kang isang non-resident. Hindi ka maaaring mag-claim ng VAT refund para sa mga gastos sa pagkain, bayad sa hotel, o service charges. Ang mga refund ay nalalapat lamang sa "Physical Goods" na ilalabas ng bansa.*
*   **Minimum na Pagbili**: *Dapat mong matugunan ang minimum spend requirement sa isang tindahan sa loob ng isang araw (halimbawa, 2,000 Baht sa Thailand).*
*   **Mga Awtorisadong Tindahan**: *Ang mga pagbili ay dapat gawin mula sa mga tindahan na nagpapakita ng "VAT Refund for Tourists" sign.*

---

## Mga Hakbang sa Pag-claim ng Iyong VAT Refund

### Hakbang 1: Sa Tindahan (Habang Namimili)

Kapag nagbabayad, ipakita ang iyong **Passport** upang humiling ng **VAT Refund Form**.

Bibigyan ka ng tindahan ng **VAT Refund Application Form** kasama ang **Tax Invoice**.

### Hakbang 2: Sa Paliparan (Bago ang Check-in)

Bago i-check-in ang iyong bagahe, dapat mong bisitahin ang **Customs Inspection Office**.

Ipakita ang iyong **Passport**, **Forms**, at **Biniling Produkto** sa opisyal upang makakuha ng **Customs Stamp** sa iyong mga form.

### Hakbang 3: Sa Loob ng Paliparan (Pagkatapos ng Immigration)

Pagkatapos dumaan sa Immigration at pumasok sa Departure Lounge, pumunta sa **VAT Refund Counter**.

Isumite ang iyong mga **stamped forms** upang matanggap ang iyong refund sa **Cash** o bilang credit sa iyong **Credit Card**.\`,\

  romanian: \`# Ghid de rambursare a TVA pentru călători

---

## Ce este o rambursare a TVA?

Majoritatea țărilor colectează taxe în principal de la cetățenii lor. Deoarece turiștii străini nu se stabilesc în țară, aceștia sunt eligibili pentru o rambursare a **Taxei pe Valoarea Adăugată (TVA)** plătită pentru bunurile cumpărate.

***Notă importantă***: *Nu puteți solicita o rambursare a TVA pentru cheltuielile de masă, taxele de hotel sau taxele de serviciu. Rambursările sunt aplicabile numai „Bunurilor fizice” care vor fi scoase din țară.*

---

## Cerințe de eligibilitate

Pentru a vă califica pentru o rambursare a TVA, trebuie să îndepliniți următoarele criterii:

*   **Statutul de străin**: *Trebuie să fiți nerezident. Nu puteți fi o persoană care deține o viză de rezident sau un permis de muncă în acea țară.*
*   **Achiziție minimă**: *Trebuie să îndepliniți cerința minimă de cheltuieli într-un singur magazin într-o singură zi (de exemplu, 2.000 Baht în Thailanda).*
*   **Magazine autorizate**: *Achizițiile trebuie făcute în magazine care afișează semnul „VAT Refund for Tourists”.*

---

## Pași pentru a solicita rambursarea TVA

### Pasul 1: La magazin (în timpul achiziției)

Când plătiți, prezentați **Pașaportul** pentru a solicita un **Formular de rambursare a TVA**.

Magazinul vă va furniza un **Formular de cerere de rambursare a TVA** împreună cu **Factura fiscală**.

### Pasul 2: La aeroport (înainte de check-in)

Înainte de a vă preda bagajele, trebuie să vizitați **Biroul de Inspecție Vamală (Customs Inspection Office)**.

Prezentați pașaportul, formularele și bunurile achiziționate ofițerului para a obține o **ștampilă vamală** pe formulare.

### Pasul 3: În interiorul aeroportului (după controlul pașapoartelor)

După ce ați trecut de controlul pașapoartelor, mergeți la **ghișeul de rambursare a TVA (VAT Refund Counter)**.

Subiți formularele ștampilate pentru a primi rambursarea în **numerar** sau sub formă de credit pe **cardul dumneavoastră de credit**.\`,\

  swedish: \`# Guide för momsåterbäring (VAT Refund) för resenärer

---

## Vad är momsåterbäring?

De flesta länder tar främst ut skatt från sina medborgare. Eftersom utländska turister inte bosätter sig i landet har de rätt till återbetalning av den **mervärdesskatt (moms)** som betalats för köpta varor.

***Viktig anmärkning***: *Du kan inte kräva momsåterbäring för restaurangbesök, hotellavgifter eller serviceavgifter. Återbetalning gäller endast "fysiska varor" som tas ut ur landet.*

---

## Krav för berättigande

För att kvalificera dig för momsåterbäring måste du uppfylla följande kriterier:

*   **Utländsk status**: *Du måste vara icke-bosatt. Du kan inte vara en person som innehar ett uppehållstillstånd eller arbetstillstånd i landet.*
*   **Minsta köp**: *Du måste uppfylla minimikravet på inköp i en enda butik under en dag (t.ex. 2 000 Baht i Thailand).*
*   **Auktoriserade butiker**: *Inköp måste göras i butiker som visar skylten "VAT Refund for Tourists".*

---

## Steg för att kräva din momsåterbäring

### Steg 1: I butiken (vid köpet)

Vid betalning, visa upp ditt **pass** för att begära ett **momsåterbäringsformulär**. (Vissa butiker kan acceptera en kopia av passet).

Butiken kommer att ge dig en **ansökan om momsåterbäring** (t.ex. **P.P.10-formulär** i Thailand) tillsammans med **skattefakturan**.

### Steg 2: På flygplatsen (före incheckning)

Innan du checkar in ditt bagage måste du besöka **tullinspektionen (Customs Inspection Office)**.

Visa upp ditt **pass**, **formulär** och de **köpta varorna** för tjänstemannen för att få en **tullstämpel** på dina formulär.

***Kritiskt krav***: *Du kan inte ta ut pengar utan denna stämpel. Varor av högt värde (t.ex. telefoner, klockor, smycken) inspekteras ofta direkt av tjänstemannen.*

### Steg 3: Inne på flygplatsen (efter passkontrollen)

När du har passerat passkontrollen och kommit in i avgångshallen, gå till **disken för momsåterbäring (VAT Refund Counter)**.

Lämna in dina **stämplade formulär** för att få din återbetalning i **kontanter** eller som en kreditering på ditt **kreditkort**.\`,\

  turkish: \`# Gezginler İçin KDV İadesi (VAT Refund) Rehberi

---

## KDV İadesi Nedir?

Çoğu ülke vergileri temel olarak kendi vatandaşlarından toplar. Yabancı turistler ülkede yerleşik olmadıkları için, satın alınan ürünler üzerinden ödenen **Katma Değer Vergisi (KDV)** iadesini alma hakkına sahiptirler.

***Önemli Not***: *Yemek masrafları, otel ücretleri veya servis ücretleri için KDV iadesi talep edemezsiniz. İadeler yalnızca ülke dışına çıkarılacak "Fiziksel Mallar" için geçerlidir.*

---

## Başvuru Şartları

KDV iadesine hak kazanmak için aşağıdaki kriterleri karşılamanız gerekir:

*   **Yabancı Statüsü**: *Yerleşik olmayan biri olmalısınız. O ülkede oturma vizesi veya çalışma izni sahibi olamazsınız.*
*   **Minimum Satın Alma**: *Bir gün içinde tek bir mağazada minimum harcama tutarını (örneğin Tayland'da 2.000 Baht) karşılamalısınız.*
*   **Yetkili Mağazalar**: *Alışverişler, "VAT Refund for Tourists" tabelası olan mağazalardan yapılmalıdır.*

---

## KDV İadesi Talep Etme Adımları

### Adım 1: Mağazada (Satın Alma Sırasında)

Ödeme yaparken, **KDV İade Formu** talep etmek için **Pasaportunuzu** ibraz edin.

Mağaza size **Vergi Faturası** ile birlikte bir **KDV İade Başvuru Formu** sunacaktır.

### Adım 2: Havaalanında (Check-in Öncesi)

Bagajınızı teslim etmeden önce **Gümrük Muayene Ofisini (Customs Inspection Office)** ziyaret etmelisiniz.

Formlarınıza **Gümrük Mührü** alabilmek için pasaportunuzu, formlarınızı ve satın aldığınız ürünleri memura gösterin.

### Adım 3: Havaalanı İçinde (Pasaport Kontrolünden Sonra)

Pasaport kontrolünden geçip gidiş salonuna girdikten sonra **KDV İade Bankosuna (VAT Refund Counter)** gidin.

İadenizi **Nakit** veya **Kredi Kartınıza** geri almak için mühürlü formlarınızı teslim edin.\`,
};
`;

fs.writeFileSync(filePath, content);
console.log('Restored vatRefundGuide.ts with all 26 languages.');
