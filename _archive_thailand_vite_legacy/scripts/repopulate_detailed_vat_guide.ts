import * as fs from 'fs';
import * as path from 'path';

const allLanguages = [
  "myanmar", "english", "thai", "spanish", "french", "korean", "japanese", "german", 
  "italian", "portuguese", "russian", "arabic", "vietnamese", "indonesian", "malay", "hindi"
];

// Re-using the core markdown from the English version as a base, with localized headers/content
const guides: Record<string, string> = {
  english: `# VAT Refund Guide for Travelers

---

## 1. __<u>What is a VAT Refund?</u>__

Most countries collect taxes primarily from their citizens. Since foreign tourists do not settle in the country, they are eligible for a refund on the **Value Added Tax (VAT)** paid on purchased goods.

***Important Note***: *You cannot claim a VAT refund for dining expenses, hotel fees, or service charges. Refunds are only applicable to "Physical Goods" that will be taken out of the country.*

---

## 2. __<u>Eligibility Requirements</u>__

To qualify for a VAT refund, you must meet the following criteria:

*   **[Foreign Status]**: *You must be a non-resident. You cannot be a person holding a resident visa or a work permit in that country.*
*   **[Minimum Purchase]**: *You must meet the minimum spending requirement at a single store within one day (e.g., 2,000 Baht in Thailand).*
*   **[Authorized Stores]**: *Purchases must be made at shops displaying the "VAT Refund for Tourists" sign.*

---

## 3. __<u>Steps to Claim Your VAT Refund</u>__

### __<u>Step 1: At the Store (During Purchase)</u>__

When paying, present your **Passport** to request a **VAT Refund Form**. (Some stores may accept a passport copy).

The store will provide you with a **VAT Refund Application Form** (e.g., **P.P.10 Form** in Thailand) along with the **Tax Invoice**.

### __<u>Step 2: At the Airport (Before Check-in)</u>__

Before checking your luggage, you must visit the **Customs Inspection Office**.

Present your **Passport**, **Forms**, and the **Purchased Goods** to the officer to obtain a **Customs Stamp** on your forms.

***Critical Requirement***: *You cannot withdraw money without this stamp. High-value items (e.g., phones, watches, jewelry) are often inspected directly by the officer.*

### __<u>Step 3: Inside the Airport (After Immigration)</u>__

After passing through Immigration and entering the Departure Lounge, proceed to the **VAT Refund Counter**.

Submit your **stamped forms** to receive your refund in **Cash** or as a credit to your **Credit Card**.

---

## 4. __<u>Essential Tips for Travelers</u>__

*   **[Keep Items Accessible]**: *Pack your purchased goods in a way that makes them easy to retrieve if a Customs officer asks to inspect them.*
*   **[Arrive Early]**: *Airport queues for VAT refunds can be long. It is recommended to arrive at least 3 hours before your flight.*
*   **[Service Fees]**: *Please note that a small service fee is usually deducted from the total refund amount.*

---

## __<u>Summary Checklist for Travelers</u>__

*   **Step 1 [At the Store]**: *Present your Passport and request the official VAT Form.*
*   **Step 2 [Airport - Outside]**: *Obtain the mandatory Customs Stamp before checking in your luggage.*
*   **Step 3 [Airport - Inside]**: *Visit the VAT Refund Counter to collect your cash or credit.*

---

*By following these steps, you can recover between **5% to 15%** (depending on the country) of the value of your purchases!*`,

  thai: `# คู่มือการขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) สำหรับนักท่องเที่ยว

---

## 1. __<u>การขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) คืออะไร?</u>__

โดยปกติแล้ว ประเทศส่วนใหญ่จะเรียกเก็บภาษีจากพลเมืองของตน เนื่องจากนักท่องเที่ยวต่างชาติไม่ได้พำนักอาศัยอยู่ในประเทศ จึงมีสิทธิ์ขอคืน **ภาษีมูลค่าเพิ่ม (VAT)** ที่ชำระไปสำหรับสินค้าที่ซื้อได้

***หมายเหตุสำคัญ***: *คุณไม่สามารถขอคืนภาษีมูลค่าเพิ่มสำหรับค่าอาหาร ค่าโรงแรม หรือค่าบริการได้ การขอคืนภาษีใช้ได้เฉพาะกับ "สินค้าที่เป็นวัตถุ" ที่จะนำออกนอกประเทศเท่านั้น*

---

## 2. __<u>คุณสมบัติของผู้มีสิทธิขอคืนภาษี</u>__

ในการขอคืนภาษีมูลค่าเพิ่ม คุณต้องมีคุณสมบัติตามหลักเกณฑ์ดังต่อไปนี้:

*   **[สถานะชาวต่างชาติ]**: *คุณต้องเป็นผู้ที่ไม่ได้พำนักอยู่ในประเทศนั้นๆ (Non-resident) และไม่ใช่ผู้ที่ถือวีซ่าพำนักอาศัยหรือใบอนุญาตทำงานในประเทศนั้น*
*   **[ยอดซื้อขั้นต่ำ]**: *คุณต้องมียอดซื้อสินค้าจากร้านเดียวกันภายในหนึ่งวันตามจำนวนขั้นต่ำที่กำหนด (เช่น 2,000 บาท ในประเทศไทย)*
*   **[ร้านค้าที่ได้รับอนุญาต]**: *สินค้าต้องซื้อจากร้านค้าที่มีป้าย "VAT Refund for Tourists" แสดงอยู่*

---

## 3. __<u>ขั้นตอนการขอคืนภาษีมูลค่าเพิ่ม</u>__

### __<u>ขั้นตอนที่ 1: ที่ร้านค้า (ขณะซื้อสินค้า)</u>__

เมื่อชำระเงิน ให้แสดง **หนังสือเดินทาง (Passport)** เพื่อขอรับ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** (บางร้านอาจรับสำเนาหนังสือเดินทาง)

ร้านค้าจะมอบ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** (เช่น **แบบ ภ.พ.10** ในไทย) พร้อมกับ **ใบกำกับภาษีเต็มรูปแบบ** มาให้คุณ

### __<u>ขั้นตอนที่ 2: ที่สนามบิน (ก่อนเช็คอิน)</u>__

ก่อนนำกระเป๋าเดินทางไปเช็คอิน คุณต้องไปที่ **สำนักงานศุลกากร (Customs Inspection Office)**

แสดง **หนังสือเดินทาง**, **แบบคำร้อง**, และ **สินค้าที่ซื้อ** ต่อเจ้าหน้าที่เพื่อรับการ **ประทับตราศุลกากร** ในแบบคำร้องของคุณ

***ข้อกำหนดที่สำคัญ***: *หากไม่มีตราประทับนี้ คุณจะไม่สามารถรับเงินคืนได้ สินค้าที่มีมูลค่าสูง (เช่น โทรศัพท์, นาฬิกา, เครื่องประดับ) มักจะถูกเจ้าหน้าที่ตรวจสอบโดยละเอียด*

### __<u>ขั้นตอนที่ 3: ภายในสนามบิน (หลังผ่านด่านตรวจคนเข้าเมือง)</u>__

หลังจากผ่านด่านตรวจคนเข้าเมืองและเข้าสู่โถงผู้โดยสารขาออกแล้ว ให้ไปที่ **เคาน์เตอร์ขอคืนภาษีมูลค่าเพิ่ม (VAT Refund Counter)**

ยื่น **แบบคำร้องที่ประทับตราแล้ว** เพื่อรับเงินคืนเป็น **เงินสด** หรือรับคืนผ่าน **บัตรเครดิต** ของคุณ

---

## 4. __<u>คำแนะนำที่สำคัญสำหรับนักท่องเที่ยว</u>__

*   **[เตรียมสินค้าให้พร้อมตรวจสอบ]**: *ควรจัดเก็บสินค้าที่ซื้อไว้ในจุดที่หยิบออกมาแสดงได้ง่าย เผื่อกรณีเจ้าหน้าที่ศุลกากรขอดูสินค้า*
*   **[มาถึงสนามบินให้เร็วขึ้น]**: *คิวการขอคืนภาษีที่สนามบินอาจยาวมาก แนะนำให้มาถึงสนามบินก่อนเวลาเดินทางอย่างน้อย 3 ชั่วโมง*
*   **[ค่าธรรมเนียมการให้บริการ]**: *โปรดทราบว่ามักจะมีการหักค่าธรรมเนียมการดำเนินงานเล็กน้อยจากยอดเงินคืนทั้งหมด*

---

## __<u>รายการสรุปสิ่งที่ต้องทำสำหรับนักท่องเที่ยว</u>__

*   **ขั้นตอนที่ 1 [ที่ร้านค้า]**: *แสดงหนังสือเดินทางและขอแบบฟอร์ม VAT อย่างเป็นทางการ*
*   **ขั้นตอนที่ 2 [สนามบิน - ด้านนอก]**: *ต้องได้รับการประทับตราศุลกากรให้เรียบร้อยก่อนเช็คอินกระเป๋า*
*   **ขั้นตอนที่ 3 [สนามบิน - ด้านใน]**: *ไปที่เคาน์เตอร์ขอคืนภาษีเพื่อรับเงินสดหรือเครดิตคืน*

---

*การปฏิบัติตามขั้นตอนเหล่านี้ จะช่วยให้คุณได้รับเงินคืนประมาณ **5% ถึง 15%** (ขึ้นอยู่กับแต่ละประเทศ) ของมูลค่าสินค้าที่คุณซื้อ!*`,

  spanish: `# Guía de Reembolso de IVA para Viajeros

---

## 1. __<u>¿Qué es un Reembolso de IVA?</u>__

La mayoría de los países recaudan impuestos principalmente de sus ciudadanos. Dado que los turistas extranjeros no se establecen en el país, son elegibles para un reembolso del **Impuesto al Valor Agregado (IVA)** pagado por los bienes comprados.

***Nota importante***: *No puede solicitar un reembolso de IVA por gastos de restaurante, tarifas de hotel o cargos de servicio. Los reembolsos solo se aplican a "Bienes Físicos" que se sacarán del país.*

---

## 2. __<u>Requisitos de Elegibilidad</u>__

Para calificar para un reembolso de IVA, debe cumplir con los siguientes criterios:

*   **[Estado Extranjero]**: *Debe ser no residente. No puede ser una persona con una visa de residente o un permiso de trabajo en ese país.*
*   **[Compra Mínima]**: *Debe cumplir con el requisito de gasto mínimo en una sola tienda en un día (por ejemplo, 2,000 Baht en Tailandia).*
*   **[Tiendas Autorizadas]**: *Las compras deben realizarse en tiendas que exhiban el cartel de "VAT Refund for Tourists".*

---

## 3. __<u>Pasos para Reclamar su Reembolso de IVA</u>__

### __<u>Paso 1: En la Tienda (Durante la Compra)</u>__

Al pagar, presente su **Pasaporte** para solicitar un **Formulario de Reembolso de IVA**. (Algunas tiendas pueden aceptar una copia del pasaporte).

La tienda le proporcionará un **Formulario de Solicitud de Reembolso de IVA** (por ejemplo, el **Formulario P.P.10** en Tailandia) junto con la **Factura de Impuestos**.

### __<u>Paso 2: En el Aeropuerto (Antes del Check-in)</u>__

Antes de facturar su equipaje, debe visitar la **Oficina de Inspección de Aduanas (Customs Inspection Office)**.

Presente su **Pasaporte**, **Formularios** y los **Bienes Comprados** al oficial para obtener un **Sello de Aduana** en sus formularios.

***Requisito Crítico***: *No puede retirar dinero sin este sello. Los artículos de alto valor (por ejemplo, teléfonos, relojes, joyas) a menudo son inspeccionados directamente por el oficial.*

### __<u>Paso 3: Dentro del Aeropuerto (Después de Inmigración)</u>__

Después de pasar por Inmigración y entrar en la sala de salidas, diríjase al **Mostrador de Reembolso de IVA (VAT Refund Counter)**.

Envíe sus **formularios sellados** para recibir su reembolso en **Efectivo** o como un crédito en su **Tarjeta de Crédito**.

---

## 4. __<u>Consejos Esenciales para Viajeros</u>__

*   **[Mantenga los Artículos Accesibles]**: *Empaque sus productos comprados de manera que sean fáciles de recuperar si un oficial de aduanas solicita inspeccionarlos.*
*   **[Llegue Temprano]**: *Las colas en el aeropuerto para el reembolso de IVA pueden ser largas. Se recomienda llegar al menos 3 horas antes de su vuelo.*
*   **[Tarifas de Servicio]**: *Tenga en cuenta que generalmente se deduce una pequeña tarifa de servicio del monto total del reembolso.*

---

## __<u>Lista de Verificación para Viajeros</u>__

*   **Paso 1 [En la Tienda]**: *Presente su Pasaporte y solicite el formulario oficial de IVA.*
*   **Paso 2 [Aeropuerto - Fuera]**: *Obtenga el sello obligatorio de aduana antes de facturar su equipaje.*
*   **Paso 3 [Aeropuerto - Dentro]**: *Visite el mostrador de reembolso de IVA para cobrar su efectivo o crédito.*

---

*¡Al seguir estos pasos, puede recuperar entre el **5% y el 15%** (dependiendo del país) del valor de sus compras!*`,

  french: `# Guide de Remboursement de la TVA pour les Voyageurs

---

## 1. __<u>Qu'est-ce qu'un Remboursement de TVA ?</u>__

La plupart des pays perçoivent des taxes principalement auprès de leurs citoyens. Étant donné que les touristes étrangers ne s'installent pas dans le pays, ils sont éligibles à un remboursement de la **Taxe sur la Valeur Ajoutée (TVA)** payée sur les biens achetés.

***Note importante*** : *Vous ne pouvez pas demander de remboursement de TVA pour les dépenses de restauration, les frais d'hôtel ou les frais de service. Les remboursements ne s'appliquent qu'aux « Biens Physiques » qui seront sortis du pays.*

---

## 2. __<u>Conditions d'Éligibilité</u>__

Pour bénéficier d'un remboursement de TVA, vous devez remplir les critères suivants :

*   **[Statut Étranger]** : *Vous devez être non-résident. Vous ne pouvez pas être une personne titulaire d'un visa de résident ou d'un permis de travail dans ce pays.*
*   **[Achat Minimum]** : *Vous devez respecter le montant minimum d'achat dans un seul magasin en une journée (ex : 2 000 Baht en Thaïlande).*
*   **[Magasins Autorisés]** : *Les achats doivent être effectués dans des magasins affichant le panneau « VAT Refund for Tourists ».*

---

## 3. __<u>Étapes pour Demander votre Remboursement de TVA</u>__

### __<u>Étape 1 : Au Magasin (Lors de l'Achat)</u>__

Lors du paiement, présentez votre **Passeport** pour demander un **Formulaire de Remboursement de TVA**. (Certains magasins peuvent accepter une copie du passeport).

Le magasin vous remettra un **Formulaire de Demande de Remboursement de TVA** (ex : **Formulaire P.P.10** en Thaïlande) ainsi que la **Facture Fiscale**.

### __<u>Étape 2 : À l'Aéroport (Avant l'Enregistrement)</u>__

Avant de faire enregistrer vos bagages, vous devez vous rendre au **Bureau d'Inspection des Douanes (Customs Inspection Office)**.

Présentez votre **Passeport**, vos **Formulaires** et les **Biens Achetés** à l'agent pour obtenir un **Tampon Douanier** sur vos formulaires.

***Exigence Critique*** : *Vous ne pouvez pas retirer d'argent sans ce tampon. Les articles de grande valeur (ex : téléphones, montres, bijoux) sont souvent inspectés directement par l'agent.*

### __<u>Étape 3 : À l'Intérieur de l'Aéroport (Après l'Immigration)</u>__

Après avoir passé l'immigration et être entré dans la salle d'embarquement, rendez-vous au **Guichet de Remboursement de la TVA (VAT Refund Counter)**.

Soumettez vos **formulaires tamponnés** pour recevoir votre remboursement en **Espèces** ou sous forme de crédit sur votre **Carte de Crédit**.

---

## 4. __<u>Conseils Essentiels pour les Voyageurs</u>__

*   **[Gardez les Articles Accessibles]** : *Emballez vos biens achetés de manière à ce qu'ils soient faciles à récupérer si un agent des douanes demande à les inspecter.*
*   **[Arrivez Tôt]** : *Les files d'attente à l'aéroport pour le remboursement de la TVA peuvent être longues. Il est recommandé d'arriver au moins 3 heures avant votre vol.*
*   **[Frais de Service]** : *Veuillez noter qu'un petit frais de service est généralement déduit du montant total du remboursement.*

---

## __<u>Liste de Contrôle pour les Voyageurs</u>__

*   **Étape 1 [Au Magasin]** : *Présentez votre passeport et demandez le formulaire officiel de TVA.*
*   **Étape 2 [Aéroport - Extérieur]** : *Obtenez le tampon douanier obligatoire avant d'enregistrer vos bagages.*
*   **Étape 3 [Aéroport - Intérieur]** : *Visitez le guichet de remboursement de la TVA pour récupérer votre argent ou votre crédit.*

---

*En suivant ces étapes, vous pouvez récupérer entre **5 % et 15 %** (selon le pays) de la valeur de vos achats !*`,

  japanese: `# 旅行者のためのVAT還付ガイド

---

## 1. __<u>VAT還付とは何ですか？</u>__

ほとんどの国では、主に自国民から税金を徴収しています。外国人観光客はその country に定住しないため、購入した物品に対して支払った**付加価値税（VAT）**の還付を受ける権利があります。

***重要な注意点***：*食事代、宿泊代、サービス料についてはVAT還付を申請できません。還付は国外に持ち出す「物理的な物品」のみに適用されます。*

---

## 2. __<u>申請資格</u>__

VAT還付を受けるには、以下の基準を満たす必要があります。

*   **[外国人ステータス]**：*非居住者である必要があります。その国の居住ビザや就労許可証を持っている人は対象外です。*
*   **[最低購入額]**：*1日1店舗あたりの最低購入額を満たす必要があります（例：タイでは2,000バーツ）。*
*   **[認定店舗]**：*「VAT Refund for Tourists」の標識が掲示されている店舗で購入する必要があります。*

---

## 3. __<u>VAT還付を申請する手順</u>__

### __<u>ステップ1：店舗にて（購入時）</u>__

支払い時に**パスポート**を提示し、**VAT還付申請書**を請求してください。（一部の店舗ではパスポートのコピーでも受け付けられる場合があります）。

店舗から、**VAT還付申請書**（タイでは**P.P.10フォーム**など）と**タックス・インボイス（税金請求書）**が渡されます。

### __<u>ステップ2：空港にて（チェックイン前）</u>__

荷物を預ける前に、**税関検査場（Customs Inspection Office）**を訪れる必要があります。

係官に**パスポート**、**申請書**、**購入した物品**を提示し、申請書に**税関スタンプ**をもらってください。

***非常に重要な要件***：*このスタンプがないと、還付金を受け取ることができません。高額商品（携帯電話、時計、宝飾品など）は、係官によって直接検査されることがよくあります。*

### __<u>ステップ3：空港内にて（入国審査後）</u>__

入国審査を通過して出発ラウンジに入ったら、**VAT還付カウンター**へ向かってください。

**スタンプが押された申請書**を提出し、**現金**または**クレジットカード**への払い戻しとして還付金を受け取ります。

---

## 4. __<u>旅行者のための重要なヒント</u>__

*   **[物品を出しやすくしておく]**：*税関職員が検査を求めた場合に備えて、購入品をすぐに取り出せるようにパッキングしてください。*
*   **[早めに到着する]**：*空港の還付カウンターは混雑することがあります。出発の少なくとも3時間前には空港に到着することをお勧めします。*
*   **[サービス手数料]**：*還付総額から少額のサービス手数料が差し引かれるのが一般的です。*

---

## __<u>旅行者のためのまとめチェックリスト</u>__

*   **ステップ1 [店舗にて]**：*パスポートを提示し、公式のVAT申請書を請求する。*
*   **ステップ2 [空港 - 屋外]**：*荷物を預ける前に、必須の税関スタンプをもらう。*
*   **ステップ3 [空港 - 屋内]**：*VAT還付カウンターを訪れ、現金またはクレジットを受け取る。*

---

*これらの手順に従うことで、購入金額の**5%から15%**（国によって異なります）を取り戻すことができます！*`,

  korean: `# 여행자를 위한 부가세(VAT) 환급 안내

---

## 1. __<u>부가세 환급이란 무엇인가요?</u>__

대부분의 국가는 주로 자국민으로부터 세금을 징수합니다. 외국인 관광객은 국가에 거주하지 않으므로, 구매한 물품에 대해 지불한 **부가 가치세(VAT)**를 환급받을 수 있는 자격이 있습니다.

***중요 참고***: *식사 비용, 호텔 요금 또는 서비스 요금에 대해서는 부가세 환급을 신청할 수 없습니다. 환급은 해외로 반출할 "실물 상품"에 대해서만 적용됩니다.*

---

## 2. __<u>자격 요건</u>__

부가세 환급 자격을 갖추려면 다음 기준을 충족해야 합니다.

*   **[외국인 신분]**: *비거주자여야 합니다. 해당 국가의 거주 비자 또는 노동 허가증을 소지한 사람은 대상에서 제외됩니다.*
*   **[최소 구매]**: *하루에 단일 매장에서 최소 지출 요건을 충족해야 합니다(예: 태국에서는 2,000바트).*
*   **[승인된 매장]**: *구매는 "VAT Refund for Tourists" 표시가 있는 상점에서 이루어져야 합니다.*

---

## 3. __<u>부가세 환급 신청 단계</u>__

### __<u>1단계: 매장에서 (구매 시)</u>__

결제 시 **여권**을 제시하여 **부가세 환급 양식**을 요청하세요. (일부 매장에서는 여권 사본을 허용할 수도 있습니다).

상점에서는 **부가세 환급 신청서**(예: 태국의 **P.P.10 양식**)와 **세금 계산서**를 제공합니다.

### __<u>2단계: 공항에서 (체크인 전)</u>__

짐을 부치기 전에 반드시 **세관 검사국(Customs Inspection Office)**을 방문해야 합니다.

담당관에게 **여권**, **양식**, **구매한 물품**을 제시하여 양식에 **세관 도장(Customs Stamp)**을 받으십시오.

***핵심 요건***: *이 도장이 없으면 환급금을 받을 수 없습니다. 고가 품목(예: 휴대폰, 시계, 보석 등)은 담당관이 직접 검사하는 경우가 많습니다.*

### __<u>3단계: 공항 내부 (입국 심사 후)</u>__

입국 심사를 통과하여 출발 라운지에 들어온 후, **부가세 환급 카운터**로 이동하십시오.

**도장이 찍힌 양식**을 제출하여 **현금**으로 받거나 **신용카드**로 환급을 받으십시오.

---

## 4. __<u>여행자를 위한 필수 팁</u>__

*   **[물품을 꺼내기 쉽게 보관]**: *세관원이 검사를 요청할 경우 쉽게 꺼낼 수 있도록 구매한 물품을 포장하십시오.*
*   **[일찍 도착]**: *공항의 부가세 환급 대기 줄이 길 수 있습니다. 비행기 출발 최소 3시간 전에 도착하는 것이 좋습니다.*
*   **[서비스 수수료]**: *환급 총액에서 소액의 서비스 수수료가 공제될 수 있음에 유의하십시오.*

---

## __<u>여행자를 위한 요약 체크리스트</u>__

*   **1단계 [매장에서]**: *여권을 제시하고 공식 VAT 양식을 요청하십시오.*
*   **2단계 [공항 - 외부]**: *짐을 부치기 전에 필수 세관 도장을 받으십시오.*
*   **3단계 [공항 - 내부]**: *부가세 환급 카운터를 방문하여 현금 또는 크레딧을 받으십시오.*

---

*이 단계를 따르면 구매 가치의 **5%에서 15%**(국가에 따라 다름)를 되찾을 수 있습니다!*`,

  german: `# Leitfaden zur Mehrwertsteuerrückerstattung für Reisende

---

## 1. __<u>Was ist eine Mehrwertsteuerrückerstattung?</u>__

Die meisten Länder erheben Steuern hauptsächlich von ihren Bürgern. Da ausländische Touristen sich nicht im Land niederlassen, haben sie Anspruch auf eine Rückerstattung der beim Kauf von Waren gezahlten **Mehrwertsteuer (MwSt)**.

***Wichtiger Hinweis***: *Sie können keine Mehrwertsteuerrückerstattung für Gastronomieausgaben, Hotelgebühren oder Servicegebühren beantragen. Rückerstattungen gelten nur für „physische Güter“, die aus dem Land ausgeführt werden.*

---

## 2. __<u>Teilnahmevoraussetzungen</u>__

Um sich für eine Mehrwertsteuerrückerstattung zu qualifizieren, müssen Sie die folgenden Kriterien erfüllen:

*   **[Ausländerstatus]**: *Sie müssen Nicht-Ansässiger sein. Sie dürfen keine Person mit einem Visum für Ansässige oder einer Arbeitserlaubnis in diesem Land sein.*
*   **[Mindesteinkauf]**: *Sie müssen die Mindestausgabenanforderung in einem einzigen Geschäft an einem Tag erfüllen (z. B. 2.000 Baht in Thailand).*
*   **[Autorisierte Geschäfte]**: *Einkäufe müssen in Geschäften getätigt werden, die das Schild „VAT Refund for Tourists“ führen.*

---

## 3. __<u>Schritte zur Beantragung Ihrer Mehrwertsteuerrückerstattung</u>__

### __<u>Schritt 1: Im Geschäft (beim Kauf)</u>__

Legen Sie beim Bezahlen Ihren **Reisepass** vor, um ein **Mehrwertsteuerrückerstattungsformular** anzufordern. (Einige Geschäfte akzeptieren möglicherweise eine Passkopie).

Das Geschäft händigt Ihnen ein **Mehrwertsteuerrückerstattungsformular** (z. B. das **Formular P.P.10** in Thailand) zusammen mit der **Steuerrechnung** aus.

### __<u>Schritt 2: Am Flughafen (vor dem Check-in)</u>__

Bevor Sie Ihr Gepäck aufgeben, müssen Sie das **Zollinspektionsbüro (Customs Inspection Office)** aufsuchen.

Legen Sie dem Beamten Ihren **Reisepass**, die **Formulare** und die **gekauften Waren** vor, um einen **Zollstempel** auf Ihren Formularen zu erhalten.

***Wichtige Anforderung***: *Ohne diesen Stempel können Sie kein Geld abheben. Hochwertige Artikel (z. B. Telefone, Uhren, Schmuck) werden oft direkt vom Beamten kontrolliert.*

### __<u>Schritt 3: Im Flughafen (nach der Einreisekontrolle)</u>__

Nachdem Sie die Passkontrolle passiert haben und den Abflugbereich betreten haben, begeben Sie sich zum **MwSt.-Rückerstattungsschalter (VAT Refund Counter)**.

Geben Sie Ihre **gestempelten Formulare** ab, um Ihre Rückerstattung in **Bar** oder als Gutschrift auf Ihrer **Kreditkarte** zu erhalten.

---

## 4. __<u>Wichtige Tipps für Reisende</u>__

*   **[Waren griffbereit halten]**: *Packen Sie Ihre gekauften Waren so, dass sie leicht herauszunehmen sind, falls ein Zollbeamter sie inspizieren möchte.*
*   **[Frühzeitig ankommen]**: *Die Warteschlangen am Flughafen für die MwSt.-Rückerstattung können lang sein. Es wird empfohlen, mindestens 3 Stunden vor Abflug anzukommen.*
*   **[Servicegebühren]**: *Bitte beachten Sie, dass in der Regel eine kleine Servicegebühr vom Gesamterstattungsbetrag abgezogen wird.*

---

## __<u>Zusammenfassende Checkliste für Reisende</u>__

*   **Schritt 1 [Im Geschäft]**: *Legen Sie Ihren Reisepass vor und fordern Sie das offizielle MwSt.-Formular an.*
*   **Schritt 2 [Flughafen - Außen]**: *Holen Sie sich den obligatorischen Zollstempel, bevor Sie Ihr Gepäck aufgeben.*
*   **Schritt 3 [Flughafen - innen]**: *Besuchen Sie den MwSt.-Rückerstattungsschalter, um Ihr Bargeld oder Guthaben abzuholen.*

---

*Wenn Sie diese Schritte befolgen, können Sie je nach Land zwischen **5% und 15%** des Wertes Ihrer Einkäufe zurückerhalten!*`,

  italian: `# Guida al Rimborso IVA per i Viaggiatori

---

## 1. __<u>Cos'è un Rimborso IVA?</u>__

La maggior parte dei paesi riscuote tasse principalmente dai propri cittadini. Poiché i turisti stranieri non risiedono nel paese, hanno diritto al rimborso dell'**Imposta sul Valore Aggiunto (IVA)** pagata sui beni acquistati.

***Nota importante***: *Non è possibile richiedere il rimborso IVA per le spese di ristorazione, le spese di hotel o i costi di servizio. I rimborsi sono applicabili solo ai "Beni Fisici" che verranno portati fuori dal paese.*

---

## 2. __<u>Requisiti di Idoneità</u>__

Per avere diritto al rimborso IVA, è necessario soddisfare i seguenti criteri:

*   **[Stato di Straniero]**: *Devi essere non residente. Non puoi essere una persona in possesso di un visto di residenza o di un permesso di lavoro in quel paese.*
*   **[Acquisto Minimo]**: *Devi soddisfare il requisito di spesa minima in un singolo negozio in un giorno (ad esempio, 2.000 Baht in Thailandia).*
*   **[Negozi Autorizzati]**: *Gli acquisti devono essere effettuati presso negozi che espongono il cartello "VAT Refund for Tourists".*

---

## 3. __<u>Passaggi per Richiedere il Rimborso IVA</u>__

### __<u>Passaggio 1: In Negozio (al Momento dell'Acquisto)</u>__

Al momento del pagamento, presenta il tuo **Passaporto** per richiedere il **Modulo di Rimborso IVA**. (Alcuni negozi potrebbero accettare una copia del passaporto).

Il negozio ti fornirà un **Modulo di Domanda di Rimborso IVA** (ad esempio, il **Modulo P.P.10** in Thailandia) insieme alla **Fattura Fiscale**.

### __<u>Passaggio 2: In Aeroporto (prima del Check-in)</u>__

Prima di imbarcare i bagagli, devi recarti all'**Ufficio di Ispezione Doganale (Customs Inspection Office)**.

Presenta il tuo **Passaporto**, i **Moduli** e i **Beni Acquistati** all'ufficiale per ottenere il **Timbro Doganale** sui tuoi moduli.

***Requisito Critico***: *Non puoi ritirare denaro senza questo timbro. Gli articoli di alto valore (ad esempio telefoni, orologi, gioielli) sono spesso ispezionati direttamente dall'ufficiale.*

### __<u>Passaggio 3: All'interno dell'Aeroporto (dopo l'Immigrazione)</u>__

Dopo aver superato l'immigrazione ed essere entrati nella Departure Lounge (area partenze), recati al **Banco del Rimborso IVA (VAT Refund Counter)**.

Consegna i tuoi **moduli timbrati** per ricevere il rimborso in **Contanti** o come credito sulla tua **Carta di Credito**.

---

## 4. __<u>Suggerimenti Essenziali per i Viaggiatori</u>__

*   **[Mantieni gli Articoli Accessibili]**: *Imballa i beni acquistati in modo che siano facili da recuperare se un ufficiale doganale chiede di ispezionarli.*
*   **[Arriva Presto]**: *Le code in aeroporto per il rimborso IVA possono essere lunghe. Si consiglia di arrivare almeno 3 ore prima del volo.*
*   **[Commissioni di Servizio]**: *Si prega di notare che una piccola commissione di servizio viene solitamente detratta dall'importo totale del rimborso.*

---

## __<u>Checklist Riassuntiva per i Viaggiatori</u>__

*   **Passaggio 1 [In Negozio]**: *Presenta il passaporto e richiedi il modulo ufficiale IVA.*
*   **Passaggio 2 [Aeroporto - Esterno]**: *Ottieni il timbro doganale obbligatorio prima di imbarcare i bagagli.*
*   **Passaggio 3 [Aeroporto - Interno]**: *Recati al banco del rimborso IVA per ritirare i contanti o il credito.*

---

*Seguendo questi passaggi, puoi recuperare tra il **5% e il 15%** (a seconda del paese) del valore dei tuoi acquisti!*`,

  portuguese: `# Guia de Reembolso de IVA para Viajantes

---

## 1. __<u>O que é um Reembolso de IVA?</u>__

A maioria dos países cobra impostos principalmente dos seus cidadãos. Como os turistas estrangeiros não se estabelecem no país, são elegíveis para um reembolso do **Imposto sobre o Valor Acrescentado (IVA)** pago nos bens adquiridos.

***Nota Importante***: *Não pode solicitar um reembolso de IVA para despesas de refeições, taxas de hotel ou taxas de serviço. Os reembolsos aplicam-se apenas a "Bens Físicos" que serão retirados do país.*

---

## 2. __<u>Requisitos de Elegibilidade</u>__

Para se qualificar para um reembolso de IVA, deve cumprir os seguintes critérios:

*   **[Estatuto de Estrangeiro]**: *Deve ser não residente. Não pode ser uma pessoa titular de um visto de residente ou de uma autorização de trabalho nesse país.*
*   **[Compra Mínima]**: *Deve cumprir o requisito de gasto mínimo numa única loja num dia (por exemplo, 2.000 Baht na Tailândia).*
*   **[Lojas Autorizadas]**: *As compras devem ser feitas em lojas que exibam o sinal "VAT Refund for Tourists".*

---

## 3. __<u>Passos para Reclamar o seu Reembolso de IVA</u>__

### __<u>Passo 1: Na Loja (Durante a Compra)</u>__

Ao pagar, apresente o seu **Passaporte** para solicitar um **Formulário de Reembolso de IVA**. (Algumas lojas podem aceitar uma cópia do passaporte).

A loja fornecer-lhe-á um **Formulário de Pedido de Reembolso de IVA** (por exemplo, o **Formulário P.P.10** na Tailândia) juntamente com a **Fatura Fiscal**.

### __<u>Passo 2: No Aeroporto (Antes do Check-in)</u>__

Antes de despachar a sua bagagem, deve visitar o **Escritório de Inspeção Aduaneira (Customs Inspection Office)**.

Apresente o seu **Passaporte**, **Formulários** e os **Bens Adquiridos** ao oficial para obter um **Carimbo Aduaneiro** nos seus formulários.

***Requisito Crítico***: *Não pode levantar dinheiro sem este carimbo. Itens de alto valor (por exemplo, telemóveis, relógios, joias) são frequentemente inspecionados diretamente pelo oficial.*

### __<u>Passo 3: Dentro do Aeroporto (Após a Imigração)</u>__

Depois de passar pela Imigração e entrar na Sala de Partidas, dirija-se ao **Balcão de Reembolso de IVA (VAT Refund Counter)**.

Entregue os seus **formulários carimbados** para receber o seu reembolso em **Dinheiro** ou como um crédito no seu **Cartão de Crédito**.

---

## 4. __<u>Dicas Essenciais para Viajantes</u>__

*   **[Mantenha os itens acessíveis]**: *Embale os seus bens adquiridos de forma a serem fáceis de retirar se um oficial da alfândega pedir para os inspecionar.*
*   **[Chegue cedo]**: *As filas no aeroporto para reembolsos de IVA podem ser largas. Recomenda-se chegar pelo menos 3 horas antes do seu voo.*
*   **[Taxas de Serviço]**: *Tenha em conta que uma pequena taxa de serviço é normalmente deduzida do valor total do reembolso.*

---

## __<u>Checklist de Resumo para Viajantes</u>__

*   **Passo 1 [Na Loja]**: *Apresente o seu Passaporte e solicite o formulário oficial de IVA.*
*   **Passo 2 [Aeroporto - Fora]**: *Obtenha o carimbo aduaneiro obrigatório antes de despachar a sua bagagem.*
*   **Passo 3 [Aeroporto - Dentro]**: *Visite o Balcão de Reembolso de IVA para levantar o seu dinheiro ou crédito.*

---

*Ao seguir estes passos, pode recuperar entre **5% a 15%** (dependendo do país) do valor das suas compras!*`,

  russian: `# Руководство по возврату НДС для путешественников

---

## 1. __<u>Что такое возврат НДС?</u>__

Большинство стран собирают налоги в основном со своих граждан. Поскольку иностранные туристы не проживают в стране постоянно, они имеют право на возврат **налога на добавленную стоимость (НДС)**, уплаченного за приобретенные товары.

***Важное примечание***: *Вы не можете претендовать на возврат НДС за расходы на питание, проживание в отеле или сервисные сборы. Возврат возможен только за «физические товары», которые будут вывезены из страны.*

---

## 2. __<u>Требования для получения</u>__

Чтобы иметь право на возврат НДС, вы должны соответствовать следующим критериям:

*   **[Статус Иностранца]**: *Вы должны быть нерезидентом. Вы не можете быть лицом, имеющим резидентскую визу или разрешение на работу в этой стране.*
*   **[Минимальная Сумма Покупки]**: *Вы должны потратить минимальную сумму в одном магазине в течение одного дня (например, 2000 бат в Таиланде).*
*   **[Авторизованные Магазины]**: *Покупки должны быть сделаны в магазинах с вывеской «VAT Refund for Tourists».*

---

## 3. __<u>Шаги для получения возврата НДС</u>__

### __<u>Шаг 1: В магазине (во время покупки)</u>__

При оплате предъявите свой **Паспорт**, чтобы запросить **Форму возврата НДС**. (Некоторые магазины могут принять копию паспорта).

Магазин предоставит вам **Форму заявления на возврат НДС** (например, **Форму P.P.10** в Таиланде) вместе с **Налоговой накладной**.

### __<u>Шаг 2: В аэропорту (до регистрации на рейс)</u>__

Перед тем как сдать багаж, вы должны посетить **Офис таможенного досмотра (Customs Inspection Office)**.

Предъявите свой **Паспорт**, **Формы** и **Купленные Товары** офицеру, чтобы получить **Таможенный штамп** на ваших формах.

***Важное требование***: *Вы не сможете получить деньги без этого штампа. Дорогостоящие товары (например, телефоны, часы, ювелирные изделия) часто осматриваются офицером лично.*

### __<u>Шаг 3: В аэропорту (после паспортного контроля)</u>__

Пройдя паспортный контроль и попав в зал вылета, направляйтесь к **Стойке возврата НДС (VAT Refund Counter)**.

Предъявите свои **формы со штампами**, чтобы получить возврат **наличными** или на вашу **кредитную карту**.

---

## 4. __<u>Важные советы для путешественников</u>__

*   **[Держите вещи доступными]**: *Упаковывайте купленные товары так, чтобы их было легко достать, если сотрудник таможни попросит их осмотреть.*
*   **[Приезжайте заранее]**: *Очереди в аэропорту на возврат НДС могут быть длинными. Рекомендуется прибыть как минимум за 3 часа до вылета.*
*   **[Сервисный сбор]**: *Обратите внимание, что из общей суммы возврата обычно вычитается небольшой сервисный сбор.*

---

## __<u>Краткий контрольный список для путешественников</u>__

*   **Шаг 1 [В магазине]**: *Предъявите паспорт и запросите официальную форму НДС.*
*   **Шаг 2 [Аэропорт — Снаружи]**: *Получите обязательный таможенный штамп перед сдачей багажа.*
*   **Шаг 3 [Аэропорт — Внутри]**: *Посетите стойку возврата НДС, чтобы получить наличные или кредит.*

---

*Следуя этим шагам, вы можете вернуть от **5% до 15%** (в зависимости от страны) от стоимости ваших покупок!*`,

  arabic: `# دليل استرداد ضريبة القيمة المضافة للمسافرين

---

## 1. __<u>ما هو استرداد ضريبة القيمة المضافة؟</u>__

تقوم معظم الدول بجمع الضرائب بشكل أساسي من مواطنيها. وبما أن السياح الأجانب لا يستقرون في البلاد، فهم مؤهلون لاسترداد **ضريبة القيمة المضافة (VAT)** المدفوعة على السلع المشتراة.

***ملاحظة مهمة***: *لا يمكنك المطالبة باسترداد ضريبة القيمة المضافة لمصاريف الطعام أو رسوم الفنادق أو رسوم الخدمة. ينطبق الاسترداد فقط على "السلع المادية" التي سيتم إخراجها من البلاد.*

---

## 2. __<u>شروط الاستحقاق</u>__

للتأهل لاسترداد ضريبة القيمة المضافة، يجب عليك استيفاء المعايير التالية:

*   **[الوضع الأجنبي]**: *يجب أن تكون غير مقيم. لا يمكنك أن تكون شخصًا يحمل تأشيرة إقامة أو تصريح عمل في ذلك البلد.*
*   **[الحد الأدنى للشراء]**: *يجب أن تستوفي متطلبات الحد الأدنى للإنفاق في متجر واحد خلال يوم واحد (على سبيل المثال، 2,000 باهت في تايلاند).*
*   **[المتاجر المعتمدة]**: *يجب إجراء المشتريات من المتاجر التي تعرض لافتة "VAT Refund for Tourists".*

---

## 3. __<u>خطوات المطالبة باسترداد ضريبة القيمة المضافة</u>__

### __<u>الخطوة 1: في المتجر (أثناء الشراء)</u>__

عند الدفع، قدم **جواز سفرك** لطلب **نموذج استرداد ضريبة القيمة المضافة**. (قد تقبل بعض المتاجر نسخة من جواز السفر).

سيوفر لك المتجر **نموذج طلب استرداد ضريبة القيمة المضافة** (مثل **نموذج P.P.10** في تايلاند) بالإضافة إلى **الفاتورة الضريبية**.

### __<u>الخطوة 2: في المطار (قبل تسجيل الوصول)</u>__

قبل فحص أمتعتك، يجب عليك زيارة **مكتب تفتيش الجمارك (Customs Inspection Office)**.

قدم **جواز سفرك** و**النماذج** و**السلع المشتراة** للضابط للحصول على **ختم الجمارك** على نماذجك.

***متطلب أساسي***: *لا يمكنك سحب الأموال بدون هذا الختم. غالبًا ما يتم فحص العناصر ذات القيمة العالية (مثل الهواتف والساعات والمجوهرات) مباشرة من قبل الضابط.*

### __<u>الخطوة 3: داخل المطار (بعد الجوازات)</u>__

بعد المرور عبر قسم الجوازات والدخول إلى صالة المغادرة، توجه إلى **مكتب استرداد ضريبة القيمة المضافة (VAT Refund Counter)**.

قدم **نماذجك المختومة** لاستلام مبلغ الاسترداد **نقدًا** أو كرصيد في **بطاقتك الائتمانية**.

---

## 4. __<u>نصائح أساسية للمسافرين</u>__

*   **[حافظ على سهولة الوصول إلى العناصر]**: *قم بتعبئة السلع التي اشتريتها بطريقة تجعل من السهل إخراجها إذا طلب ضابط الجمارك فحصها.*
*   **[الوصول مبكرًا]**: *يمكن أن تكون طوابير المطار لاسترداد ضريبة القيمة المضافة طويلة. يوصى بالوصول قبل 3 ساعات على الأقل من موعد رحلتك.*
*   **[رسوم الخدمة]**: *يرجى ملاحظة أنه عادة ما يتم خصم رسوم خدمة صغيرة من إجمالي مبلغ استرداد الضريبة.*

---

## __<u>قائمة مراجعة ملخصة للمسافرين</u>__

*   **الخطوة 1 [في المتجر]**: *قدم جواز سفرك واطلب نموذج ضريبة القيمة المضافة الرسمي.*
*   **الخطوة 2 [المطار - الخارج]**: *احصل على ختم الجمارك الإلزامي قبل تسجيل حقائبك.*
*   **الخطوة 3 [المطار - الداخل]**: *قم بزيارة مكتب استرداد ضريبة القيمة المضافة لاستلام نقودك أو رصيدك.*

---

*باتباع هذه الخطوات، يمكنك استرداد ما بين **5% إلى 15%** (حسب الدولة) من قيمة مشترياتك!*`,

  vietnamese: `# Hướng dẫn Hoàn thuế GTGT cho Khách du lịch

---

## 1. __<u>Hoàn thuế GTGT là gì?</u>__

Hầu hết các quốc gia thu thuế chủ yếu từ công dân của họ. Vì khách du lịch nước ngoài không định cư tại quốc gia đó, họ đủ điều kiện để được hoàn lại **Thuế Giá trị Gia tăng (GTGT)** đã trả cho hàng hóa đã mua.

***Lưu ý quan trọng***: *Bạn không thể yêu cầu hoàn thuế GTGT cho chi tiêu ăn uống, phí khách sạn hoặc phí dịch vụ. Hoàn thuế chỉ áp dụng cho "Hàng hóa vật chất" sẽ được mang ra khỏi quốc gia đó.*

---

## 2. __<u>Yêu cầu về điều kiện</u>__

Để đủ điều kiện được hoàn thuế GTGT, bạn phải đáp ứng các tiêu chí sau:

*   **[Trạng thái người nước ngoài]**: *Bạn phải là người không cư trú. Bạn không thể là người có thị thực cư trú hoặc giấy phép lao động tại quốc gia đó.*
*   **[Mức mua tối thiểu]**: *Bạn phải đáp ứng yêu cầu chi tiêu tối thiểu tại một cửa hàng trong một ngày (ví dụ: 2.000 Baht ở Thái Lan).*
*   **[Cửa hàng được ủy quyền]**: *Việc mua hàng phải được thực hiện tại các cửa hàng có bảng hiệu "VAT Refund for Tourists".*

---

## 3. __<u>Các bước để yêu cầu Hoàn thuế GTGT</u>__

### __<u>Bước 1: Tại cửa hàng (Trong khi mua hàng)</u>__

Khi thanh toán, hãy xuất trình **Hộ chiếu** của bạn để yêu cầu **Mẫu hoàn thuế GTGT**. (Một số cửa hàng có thể chấp nhận bản sao hộ chiếu).

Cửa hàng sẽ cung cấp cho bạn **Đơn đề nghị hoàn thuế GTGT** (ví dụ: **Mẫu P.P.10** ở Thái Lan) cùng với **Hóa đơn thuế**.

### __<u>Bước 2: Tại sân bay (Trước khi làm thủ tục check-in)</u>__

Trước khi ký gửi hành lý, bạn phải đến **Văn phòng Kiểm tra Hải quan (Customs Inspection Office)**.

Xuất trình **Hộ chiếu**, **Biểu mẫu** và **Hàng hóa đã mua** cho viên chức hải quan để nhận **Dấu Hải quan** trên biểu mẫu của bạn.

***Yêu cầu quan trọng***: *Bạn không thể rút tiền nếu không có con dấu này. Các mặt hàng có giá trị cao (ví dụ: điện thoại, đồng hồ, đồ trang sức) thường được viên chức kiểm tra trực tiếp.*

### __<u>Bước 3: Bên trong sân bay (Sau khi nhập cảnh)</u>__

Sau khi đi qua khu vực Nhập cảnh và vào Phòng chờ Khởi hành, hãy đi đến **Quầy hoàn thuế GTGT (VAT Refund Counter)**.

Nộp **biểu mẫu đã có dấu** để nhận tiền hoàn lại bằng **Tiền mặt** hoặc dưới dạng tín dụng vào **Thẻ tín dụng** của bạn.

---

## 4. __<u>Mẹo thiết yếu cho khách du lịch</u>__

*   **[Giữ hàng hóa dễ lấy]**: *Đóng gói hàng hóa đã mua theo cách dễ lấy ra nếu viên chức Hải quan yêu cầu kiểm tra.*
*   **[Đến sớm]**: *Xếp hàng tại sân bay để hoàn thuế GTGT có thể rất dài. Bạn nên đến ít nhất 3 giờ trước chuyến bay.*
*   **[Phí dịch vụ]**: *Xin lưu ý rằng một khoản phí dịch vụ nhỏ thường được khấu trừ vào tổng số tiền hoàn thuế.*

---

## __<u>Danh sách kiểm tra tóm tắt cho khách du lịch</u>__

*   **Bước 1 [Tại cửa hàng]**: *Xuất trình Hộ chiếu và yêu cầu mẫu thuế GTGT chính thức.*
*   **Bước 2 [Sân bay - Bên ngoài]**: *Lấy Dấu Hải quan bắt buộc trước khi ký gửi hành lý.*
*   **Bước 3 [Sân bay - Bên trong]**: *Đến Quầy hoàn thuế GTGT để nhận tiền mặt hoặc tín dụng.*

---

*Bằng cách làm theo các bước này, bạn có thể lấy lại từ **5% đến 15%** (tùy thuộc vào quốc gia) giá trị giao dịch của mình!*`,

  indonesian: `# Panduan Pengembalian Dana PPN untuk Wisatawan

---

## 1. __<u>Apa itu Pengembalian Dana PPN?</u>__

Sebagian besar negara memungut pajak terutama dari warga negaranya. Karena wisatawan asing tidak menetap di negara tersebut, mereka berhak atas pengembalian dana **Pajak Pertambahan Nilai (PPN)** yang dibayarkan atas barang yang dibeli.

***Catatan Penting***: *Anda tidak dapat mengklaim pengembalian dana PPN untuk biaya makan, biaya hotel, atau biaya layanan. Pengembalian dana hanya berlaku untuk "Barang Fisik" yang akan dibawa keluar negeri.*

---

## 2. __<u>Syarat Kelayakan</u>__

Untuk memenuhi syarat pengembalian dana PPN, Anda harus memenuhi kriteria berikut:

*   **[Status Orang Asing]**: *Anda harus merupakan non-residen. Anda tidak boleh merupakan orang yang memegang visa penduduk atau izin kerja di negara tersebut.*
*   **[Minimal Pembelian]**: *Anda harus memenuhi syarat pembelanjaan minimum di satu toko dalam satu hari (misalnya, 2.000 Baht di Thailand).*
*   **[Toko Resmi]**: *Pembelian harus dilakukan di toko yang memasang tanda "VAT Refund for Tourists".*

---

## 3. __<u>Langkah-langkah untuk Mengklaim Pengembalian Dana PPN Anda</u>__

### __<u>Langkah 1: Di Toko (Selama Pembelian)</u>__

Saat membayar, tunjukkan **Paspor** Anda untuk meminta **Formulir Pengembalian Dana PPN**. (Beberapa toko mungkin menerima salinan paspor).

Toko akan memberi Anda **Formulir Pengajuan Pengembalian Dana PPN** (misalnya, **Formulir P.P.10** di Thailand) beserta **Faktur Pajak**.

### __<u>Langkah 2: Di Bandara (Sebelum Check-in)</u>__

Sebelum menitipkan bagasi, Anda harus mengunjungi **Kantor Inspeksi Bea Cukai (Customs Inspection Office)**.

Tunjukkan **Paspor**, **Formulir**, dan **Barang yang Dibeli** kepada petugas untuk mendapatkan **Stempel Bea Cukai** pada formulir Anda.

***Persyaratan Penting***: *Anda tidak dapat menarik uang tanpa stempel ini. Barang-barang bernilai tinggi (misalnya ponsel, jam tangan, perhiasan) sering kali diperiksa langsung oleh petugas.*

### __<u>Langkah 3: Di Dalam Bandara (Setelah Imigrasi)</u>__

Setelah melewati Imigrasi dan memasuki Ruang Keberangkatan, pergilah ke **Loket Pengembalian Dana PPN (VAT Refund Counter)**.

Serahkan **formulir yang telah distempel** untuk menerima pengembalian dana Anda dalam bentuk **Tunai** atau sebagai kredit ke **Kartu Kredit** Anda.

---

## 4. __<u>Tips Penting untuk Wisatawan</u>__

*   **[Simpan Barang di Tempat yang Mudah Diakses]**: *Kemas barang yang Anda beli sedemikian rupa sehingga mudah diambil jika petugas Bea Cukai meminta untuk memeriksanya.*
*   **[Datang Lebih Awal]**: *Antrean di bandara untuk pengembalian dana PPN bisa sangat panjang. Disarankan untuk datang setidaknya 3 jam sebelum penerbangan Anda.*
*   **[Biaya Layanan]**: *Harap perhatikan bahwa biaya layanan kecil biasanya dipotong dari total jumlah pengembalian dana.*

---

## __<u>Daftar Periksa Ringkasan untuk Wisatawan</u>__

*   **Langkah 1 [Di Toko]**: *Tunjukkan Paspor Anda dan minta formulir resmi PPN.*
*   **Langkah 2 [Bandara - Luar]**: *Dapatkan Stempel Bea Cukai yang wajib sebelum menitipkan bagasi Anda.*
*   **Langkah 3 [Bandara - Dalam]**: *Kunjungi Loket Pengembalian Dana PPN untuk mengambil uang tunai atau kredit Anda.*

---

## 4. __<u>Langkah 3: Di Dalam Bandara (Setelah Imigrasi)</u>__

Setelah melewati Imigrasi dan memasuki Ruang Keberangkatan, pergilah ke **Loket Pengembalian Dana PPN (VAT Refund Counter)**.

Serahkan **formulir yang telah distempel** untuk menerima pengembalian dana Anda dalam bentuk **Tunai** atau sebagai kredit ke **Kartu Kredit** Anda.

---

## 4. __<u>Tips Penting untuk Wisatawan</u>__

*   **[Simpan Barang di Tempat yang Mudah Diakses]**: *Kemas barang yang Anda beli sedemikian rupa sehingga mudah diambil jika petugas Bea Cukai meminta untuk memeriksanya.*
*   **[Datang Lebih Awal]**: *Antrean di bandara untuk pengembalian dana PPN bisa sangat panjang. Disarankan untuk datang setidaknya 3 jam sebelum penerbangan Anda.*
*   **[Biaya Layanan]**: *Harap perhatikan bahwa biaya layanan kecil biasanya dipotong dari total jumlah pengembalian dana.*

---

## __<u>Daftar Periksa Ringkasan untuk Wisatawan</u>__

*   **Langkah 1 [Di Toko]**: *Tunjukkan Paspor Anda dan minta formulir resmi PPN.*
*   **Langkah 2 [Bandara - Luar]**: *Dapatkan Stempel Bea Cukai yang wajib sebelum menitipkan bagasi Anda.*
*   **Langkah 3 [Bandara - Dalam]**: *Kunjungi Loket Pengembalian Dana PPN untuk mengambil uang tunai atau kredit Anda.*

---

*Dengan mengikuti langkah-langkah ini, Anda dapat memulihkan antara **5% hingga 15%** (tergantung pada negara) dari nilai pembelian Anda!*`,

  malay: `# Panduan Bayaran Balik VAT untuk Pengembara

---

## 1. __<u>Apakah itu Bayaran Balik VAT?</u>__

Kebanyakan negara mengutip cukai teramanya daripada warganegara mereka. Oleh kerana pelancong asing tidak menetap di negara tersebut, mereka layak mendapat bayaran balik ke atas **Cukai Tambah Nilai (VAT)** yang dibayar ke atas barangan yang dibeli.

***Nota Penting***: *Anda tidak boleh menuntut bayaran balik VAT untuk perbelanjaan makan, yuran hotel atau caj perkhidmatan. Bayaran balik hanya terpakai kepada "Barangan Fizikal" yang akan dibawa keluar dari negara tersebut.*

---

## 2. __<u>Syarat Kelayakan</u>__

Untuk layak mendapat bayaran balik VAT, anda mesti memenuhi kriteria berikut:

*   **[Status Warga Asing]**: *Anda mestilah bukan pemastautin. Anda tidak boleh menjadi orang yang memegang visa kediaman atau permit kerja di negara tersebut.*
*   **[Pembelian Minimum]**: *Anda mesti memenuhi syarat perbelanjaan minimum di satu kedai dalam satu hari (cth. 2,000 Baht di Thailand).*
*   **[Kedai Berdaftar]**: *Pembelian mesti dibuat di kedai yang mempamerkan tanda "VAT Refund for Tourists".*

---

## 3. __<u>Langkah-langkah untuk Menuntut Bayaran Balik VAT Anda</u>__

### __<u>Langkah 1: Di Kedai (Semasa Pembelian)</u>__

Semasa membayar, tunjukkan **Pasport** anda untuk meminta **Borang Bayaran Balik VAT**. (Sesetengah kedai mungkin menerima salinan pasport).

Kedai akan memberikan anda **Borang Permohonan Bayaran Balik VAT** (cth. Borang P.P.10 di Thailand) beserta **Invois Cukai**.

### __<u>Langkah 2: Di Lapangan Terbang (Sebelum Daftar Masuk)</u>__

Sebelum mendaftar masuk bagasi anda, anda mesti melawat **Pejabat Pemeriksaan Kastam (Customs Inspection Office)**.

Tunjukkan **Pasport**, **Borang**, dan **Barangan yang Dibeli** kepada pegawai untuk mendapatkan **Setem Kastam** pada borang anda.

***Keperluan Penting***: *Anda tidak boleh mengeluarkan wang tanpa setem ini. Barangan bernilai tinggi (cth. telefon, jam tangan, barang kemas) sering diperiksa secara terus oleh pegawai.*

### __<u>Langkah 3: Di Dalam Lapangan Terbang (Selepas Imigresen)</u>__

Selepas melalui Imigresen dan memasuki Balai Berlepas, pergi ke **Kaunter Bayaran Balik VAT (VAT Refund Counter)**.

Serahkan **borang yang telah dicop** untuk menerima bayaran balik anda dalam bentuk **Tunai** atau sebagai kredit ke **Kad Kredit** anda.

---

## 4. __<u>Tips Penting untuk Pengembara</u>__

*   **[Pastikan Barang Boleh Diakses]**: *Bungkus barangan yang anda beli dengan cara yang memudahkan ia diambil jika pegawai Kastam meminta untuk memeriksanya.*
*   **[Tiba Awal]**: *Baris gilir di lapangan terbang untuk bayaran balik VAT boleh menjadi panjang. Adalah disyorkan untuk tiba sekurang-kurangnya 3 jam sebelum penerbangan anda.*
*   **[Yuran Perkhidmatan]**: *Sila ambil perhatian bahawa yuran perkhidmatan kecil biasanya ditolak daripada jumlah keseluruhan bayaran balik.*

---

## __<u>Senarai Semak Ringkasan untuk Pengembara</u>__

*   **Langkah 1 [Di Kedai]**: *Tunjukkan Pasport anda dan minta borang VAT rasmi.*
*   **Langkah 2 [Lapangan Terbang - Luar]**: *Dapatkan Setem Kastam mandatori sebelum mendaftar masuk bagasi anda.*
*   **Langkah 3 [Lapangan Terbang - Dalam]**: *Lawati Kaunter Bayaran Balik VAT untuk mengutip tunai atau kredit anda.*

---

*Dengan mengikuti langkah-langkah ini, anda boleh mendapatkan semula antara **5% hingga 15%** (bergantung pada negara) daripada nilai pembelian anda!*`,

  hindi: `# यात्रियों के लिए वैट (VAT) रिफंड गाइड

---

## 1. __<u>वैट रिफंड क्या है?</u>__

अधिकांश देश मुख्य रूप से अपने नागरिकों से कर वसूलते हैं। चूंकि विदेशी पर्यटक देश में नहीं बसते हैं, इसलिए वे खरीदे गए सामान पर भुगतान किए गए **वस्तु एवं सेवा कर (VAT)** पर रिफंड के पात्र हैं।

***महत्वपूर्ण नोट***: *आप भोजन के खर्च, होटल शुल्क या सेवा शुल्क के लिए वैट रिफंड का दावा नहीं कर सकते। रिफंड केवल उन "भौतिक वस्तुओं" पर लागू होता है जिन्हें देश से बाहर ले जाया जाएगा।*

---

## 2. __<u>पात्रता आवश्यकताएँ</u>__

वैट रिफंड के लिए अर्हता प्राप्त करने के लिए, आपको निम्नलिखित मानदंडों को पूरा करना होगा:

*   **[विदेशी स्थिति]**: *आपको गैर-निवासी होना चाहिए। आप उस देश में निवासी वीजा या वर्क परमिट रखने वाले व्यक्ति नहीं हो सकते।*
*   **[न्यूनतम खरीद]**: *आपको एक दिन के भीतर एक ही स्टोर पर न्यूनतम खर्च की आवश्यकता को पूरा करना होगा (उदाहरण के लिए, थाईलैंड में 2,000 Baht)।*
*   **[अधिकृत स्टोर]**: *खरीद उन दुकानों पर की जानी चाहिए जिनमें "VAT Refund for Tourists" का साइन लगा हो।*

---

## 3. __<u>अपना वैट रिफंड प्राप्त करने के चरण</u>__

### __<u>चरण 1: स्टोर पर (खरीद के दौरान)</u>__

भुगतान करते समय, **वैट रिफंड फॉर्म** का अनुरोध करने के लिए अपना **पासपोर्ट** दिखाएं। (कुछ स्टोर पासपोर्ट की कॉपी स्वीकार कर सकते हैं)।

स्टोर आपको **टैक्स इनवॉइस** के साथ **वैट रिफंड आवेदन फॉर्म** (उदाहरण के लिए, थाईलैंड में **P.P.10 फॉर्म**) प्रदान करेगा।

### __<u>चरण 2: हवाई अड्डे पर (चेक-इन से पहले)</u>__

अपना सामान चेक-इन करने से पहले, आपको **सीमा शुल्क निरीक्षण कार्यालय (Customs Inspection Office)** जाना चाहिए।

अपने फॉर्म पर **सीमा शुल्क स्टैम्प (Customs Stamp)** प्राप्त करने के लिए अधिकारी को अपना **पासपोर्ट**, **फॉर्म**, और **खरीदा गया सामान** दिखाएं।

***महत्वपूर्ण आवश्यकता***: *आप इस स्टैम्प के बिना पैसे नहीं निकाल सकते। उच्च-मूल्य वाली वस्तुओं (जैसे फोन, घड़ियां, गहने) का अक्सर अधिकारी द्वारा सीधे निरीक्षण किया जाता है।*

### __<u>चरण 3: हवाई अड्डे के अंदर (इमिग्रेशन के बाद)</u>__

इमिग्रेशन से गुजरने और डिपार्चर लाउंज में प्रवेश करने के बाद, **वैट रिफंड काउंटर (VAT Refund Counter)** पर जाएं।

अपने रिफंड को **नकद** या अपने **क्रेडिट कार्ड** में प्राप्त करने के लिए अपने **स्टैम्प लगे फॉर्म** जमा करें।

---

## 4. __<u>यात्रियों के लिए आवश्यक सुझाव</u>__

*   **[सामान को सुलभ रखें]**: *अपने खरीदे गए सामान को इस तरह से पैक करें कि यदि सीमा शुल्क अधिकारी उन्हें जांचने के लिए कहे तो उन्हें निकालना आसान हो।*
*   **[जल्दी पहुंचें]**: *वैट रिफंड के लिए हवाई अड्डे पर लंबी कतारें हो सकती हैं। आपकी उड़ान से कम से कम 3 घंटे पहले पहुंचने की सलाह दी जाती है।*
*   **[सेवा शुल्क]**: *कृपया ध्यान दें कि कुल रिफंड राशि से आमतौर पर एक छोटा सेवा शुल्क काटा जाता है।*

---

## __<u>यात्रियों के लिए सारांश चेकलिस्ट</u>__

*   **चरण 1 [स्टोर पर]**: *अपना पासपोर्ट दिखाएं और आधिकारिक वैट फॉर्म का अनुरोध करें।*
*   **चरण 2 [हवाई अड्डा - बाहर]**: *अपना सामान चेक-इन करने से पहले अनिवार्य सीमा शुल्क स्टैम्प प्राप्त करें।*
*   **चरण 3 [हवाई अड्डा - अंदर]**: *अपना नकद या क्रेडिट प्राप्त करने के लिए वैट रिफंड काउंटर पर जाएं।*

---

*इन चरणों का पालन करके, आप अपनी खरीदारी के मूल्य का **5% से 15%** (देश के आधार पर) तक वापस पा सकते हैं!*`,
};

function getMarkdown(lang: string) {
  if (guides[lang]) return guides[lang];
  return guides.english;
}

const outputPath = path.join(process.cwd(), "src/data/vatRefundGuide.ts");
let fileContent = `import { ThaiLanguage } from '../types';\n\n`;
fileContent += `export const VAT_REFUND_GUIDE: Record<ThaiLanguage, string> = {\n`;

for (const lang of allLanguages) {
  const md = getMarkdown(lang);
  const escaped = md.replace(/\`/g, "\\`").replace(/\${/g, "\\${");
  fileContent += `  ${lang}: \`${escaped}\`,\n`;
}

fileContent += `};\n`;

fs.writeFileSync(outputPath, fileContent);
console.log("Detailed VAT Refund Guide updated for all languages.");
