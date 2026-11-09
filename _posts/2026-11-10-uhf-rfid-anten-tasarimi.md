---
layout: post
title: "UHF RFID İçin Mikroşerit Anten Tasarımı: Python ve HFSS ile 866,5 MHz"
author: "Rüzgar Erik"
---

![HFSS anten modeli]({{ '/assets/uhf-rfid-anten/model.png' | relative_url }})

Bu yazıda, 865–868 MHz bandında çalışması için tasarladığım mikroşerit yama antenin hesaplama ve simülasyon sürecini anlatıyorum. Başlangıç boyutlarını Python ile hesapladım, ardından Ansys HFSS üzerinde geometriyi düzenleyip empedans uyumunu iyileştirdim.

Tasarımda düşük maliyetli PCB üretimini düşünerek **1,6 mm FR-4** kullandım. Hedefim, 50 Ω beslemeli bir RFID okuyucu anteni için bant boyunca S11 değerini −10 dB altında tutmaktı.

> Bu çalışmadaki sonuçlar HFSS simülasyonlarına aittir. Prototip üretimi, VNA ölçümü ve RFID okuma mesafesi testi sonraki aşamalardır.

---

## 1. Tasarım Hedefi ve Kullanılan Malzemeler

| Parametre | Değer |
| --- | --- |
| Hedef bant | 865–868 MHz |
| Merkez frekansı | 866,5 MHz |
| Besleme empedansı | 50 Ω |
| Substrat | FR-4 |
| Substrat kalınlığı | 1,6 mm |
| Hesaplamada kullanılan bağıl permitivite | 4,4 |
| Hesaplamada kullanılan bakır kalınlığı | 35 µm |
| Anten yapısı | İçeri gömülü beslemeli dikdörtgen mikroşerit yama |

865–868 MHz bandı, ETSI EN 302 208 standardında ele alınan UHF RFID bantlarından biridir. Besleme hattını yamanın içine uzatarak bağlantı noktasındaki empedansı ayarlayabildiğim inset-feed yapısını kullandım.

FR-4 için kullandığım 4,4 değeri tasarım varsayımıdır. Gerçek üretimde seçilen laminatın permitivitesi ve kayıp tanjantı simülasyon modeliyle karşılaştırılmalıdır.

## 2. Python ile Başlangıç Boyutları

Önce yama genişliğini, etkin permitiviteyi ve saçak alanların oluşturduğu uzunluk düzeltmesini hesapladım. Ardından besleme hattının genişliğini ve ilk inset derinliğini tahmin ettim.

Temel boyutlandırma ilişkileri aşağıdaki gibidir. Burada c ışık hızı, f₀ merkez frekansı, εᵣ bağıl permitivite, εeff etkin permitivite ve ΔL her kenardaki uzunluk düzeltmesidir.

```text
W = c / (2 f₀) × √(2 / (εᵣ + 1))
L = c / (2 f₀ √εeff) − 2 ΔL
```

Python betiği şu başlangıç değerlerini verdi.

```text
Yama genişliği          105.35 mm
Yama uzunluğu            82.35 mm
Etkin permitivite         4.2635
Besleme genişliği         2.95 mm
Tahmini kenar direnci   322.88 ohm
İlk inset derinliği      30.57 mm
İlk yarık genişliği       8.85 mm
```

[Python hesaplama betiğini indir]({{ '/assets/uhf-rfid-anten/patch.py' | relative_url }})

HFSS modelinde besleme genişliğini 3 mm ve toplam yarık genişliğini 9 mm kullandım. Yarık genişliği, besleme genişliğinin üç katı olarak seçildi. Bu oran başlangıç geometrisini belirliyor, uyumun simülasyonda kontrol edilmesi gerekiyor.

![İlk parametreler]({{ '/assets/uhf-rfid-anten/ilk-parametreler.png' | relative_url }})

*Şekil 1. Başlangıç geometrisinin HFSS parametreleri.*

---

## 3. İlk Simülasyon ve Geometrinin Düzenlenmesi

İlk modelin S11 minimumu 859,9 MHz civarında −4,15 dB çıktı. Hedef merkez frekansı olan 866,5 MHz'te ise S11 yaklaşık −3,22 dB seviyesindeydi. Bu sonuç, besleme uyumunun iyileştirilmesi gerektiğini gösterdi.

![İlk S11 sonucu]({{ '/assets/uhf-rfid-anten/ilk-s11.png' | relative_url }})

*Şekil 2. İlk modelin S11 eğrisi.*

Geometri düzenlemeleri sonrasında ara tasarımın minimum S11 değeri 863,5 MHz'te −13,15 dB oldu. Uyum belirgin şekilde iyileşti, ancak minimumun frekansını hedef bandın merkezine yaklaştırmak gerekiyordu.

![Ara S11 sonucu]({{ '/assets/uhf-rfid-anten/ara-s11.png' | relative_url }})

*Şekil 3. Optimizasyon öncesindeki ara tasarım.*

İlk ve ara tasarımların Smith diyagramlarını da karşılaştırdım. Grafiklerde frekans işaretçileri bulunmadığı için bu görüntülerden belirli bir frekanstaki empedansı sayısal olarak çıkarmadım.

![İlk Smith diyagramı]({{ '/assets/uhf-rfid-anten/ilk-smith.png' | relative_url }})

*Şekil 4. İlk tasarımın Smith diyagramı.*

![Ara Smith diyagramı]({{ '/assets/uhf-rfid-anten/ara-smith.png' | relative_url }})

*Şekil 5. Ara tasarımın Smith diyagramı.*

## 4. HFSS ile Optimizasyon

HFSS üzerinde Quasi-Newton optimizasyon yöntemini kullandım. Hedefi 866,5 MHz'te S11 ≤ −15 dB olarak tanımladım ve yama uzunluğunu 80–83 mm arasında değişken yaptım.

![Optimizasyon hedefi]({{ '/assets/uhf-rfid-anten/optimizasyon-hedefi.png' | relative_url }})

*Şekil 6. Merkez frekans için tanımlanan S11 hedefi.*

![Optimizasyon değişkeni]({{ '/assets/uhf-rfid-anten/optimizasyon-degiskeni.png' | relative_url }})

*Şekil 7. Yama uzunluğunun optimizasyon sınırları.*

Başlangıç ve son geometri arasındaki değişimler aşağıdaki tabloda yer alıyor. Gösterilen optimizasyon kurulumunda aktif değişken yama uzunluğu. İnset derinliğindeki değişim ise tasarımın genel düzenleme sürecinin bir parçası.

| Parametre | İlk model | Son model |
| --- | ---: | ---: |
| Yama genişliği | 105,3515 mm | 105,3515 mm |
| Yama uzunluğu | 82,3479 mm | 82,0403 mm |
| Besleme genişliği | 3 mm | 3 mm |
| Yarık genişliği | 9 mm | 9 mm |
| İnset derinliği | 30,5700 mm | 20,5870 mm |

![Son parametreler]({{ '/assets/uhf-rfid-anten/son-parametreler.png' | relative_url }})

*Şekil 8. Son tasarımın boyutları.*

---

## 5. Sonuçların Karşılaştırılması

![Son S11 sonucu]({{ '/assets/uhf-rfid-anten/son-s11.png' | relative_url }})

*Şekil 9. Optimizasyon sonrasındaki S11 eğrisi.*

| Sonuç | İlk model | Ara tasarım | Son model |
| --- | ---: | ---: | ---: |
| Minimum S11 frekansı | 859,9 MHz | 863,5 MHz | 866,1 MHz |
| Minimum S11 | −4,15 dB | −13,15 dB | −13,38 dB |
| 865 MHz'te S11 | İşaretlenmemiş | −12,77 dB | −13,14 dB |
| 866,5 MHz'te S11 | −3,22 dB | −11,70 dB | −13,34 dB |
| 868 MHz'te S11 | İşaretlenmemiş | −10,38 dB | −12,62 dB |

−15 dB optimizasyon hedefine ulaşamadım. Buna rağmen son eğri, hedeflediğim **865–868 MHz bandının tamamında −10 dB altında** kaldı. Grafiğin gösterdiği frekans aralığı iki −10 dB kesişimini içermediği için toplam −10 dB bant genişliğini bu görüntüden belirleyemiyorum.

50 Ω referans için 866,5 MHz'teki yansıyan güç oranı yaklaşık %47,7'den %4,63'e düştü. Aynı noktada hesaplanan VSWR yaklaşık 5,46'dan 1,55'e indi. Antenin kabul ettiği gücün ne kadarını ışınıma dönüştürdüğünü belirlemek için ayrıca ışınım verimine bakmak gerekiyor.

## 6. Işınım Deseni ve Elektrik Alan

![Işınım deseni]({{ '/assets/uhf-rfid-anten/isinim-deseni.png' | relative_url }})

*Şekil 10. 866,5 MHz'te φ = 0° düzlemindeki toplam kazanç.*

Son ışınım grafiğinde, θ = 0° yönündeki kazanç yaklaşık **0,95 dBi**. Bu değer gösterilen kesitteki broadside kazancıdır. Grafikteki büyüklük HFSS'in `GainTotal` çıktısıdır. HFSS kazancı kabul edilen güce göre, gerçekleşmiş kazancı ise porta gelen güce göre hesaplar.

Bu kazanç değeri, yönlü RFID okuyucu kapsaması hedefi açısından geliştirmeye açık. Bir sonraki simülasyon adımında yönlülük ve ışınım verimini birlikte inceleyerek kayıpların etkisini değerlendirmek istiyorum.

![Elektrik alan dağılımı]({{ '/assets/uhf-rfid-anten/elektrik-alani.png' | relative_url }})

*Şekil 11. Yama kenarları ve besleme bölgesi çevresindeki elektrik alan dağılımı.*

Geometri doğrusal polarizasyon beklentisi oluşturuyor. Bunu polarizasyon bileşenleriyle kontrol etmek ve RFID etiketinin farklı yönelimlerindeki performansı ölçmek gerekiyor.

## 7. Değerlendirme ve Sonraki Adımlar

Bu projede analitik hesaplardan başlayarak HFSS modelleme ve optimizasyon sürecini uyguladım. Merkez frekanstaki S11 değerini yaklaşık 10,13 dB iyileştirdim ve hedef bant boyunca −10 dB altındaki uyumu elde ettim.

Çalışmayı ilerletmek için şu adımları planlıyorum.

1. FR-4 malzeme parametrelerini, port tanımını, sınır koşullarını ve mesh yakınsamasını kontrol etmek.
2. Son geometri için ışınım verimi, yönlülük, gerçekleşmiş kazanç ve iki ana düzlemdeki ışınım desenlerini raporlamak.
3. Boyut toleranslarının ve malzeme değişimlerinin bant içindeki uyuma etkisini incelemek.
4. Prototipi üretip VNA ile S11 ölçümü yapmak.
5. Belirli bir okuyucu ve etiketle, güç ve yönelimi kaydederek okuma mesafesi testi yapmak.

Bant içindeki empedans uyumu, RFID okuyucu anteni geliştirmek için bir başlangıç sağlıyor. Uygulamadaki performansı belirleyecek diğer sonuçlar kazanç, verim, polarizasyon ve ölçüm olacak.

## Kaynaklar

- ETSI EN 302 208 V3.4.1, Aralık 2023. [Standart metni](https://www.etsi.org/deliver/etsi_en/302200_302299/302208/03.04.01_60/en_302208v030401p.pdf)
- Ansys HFSS Help, Peak Gain. [Kazanç tanımı](https://ansyshelp.ansys.com/public/views/secured/electronics/v252/en/subsystems/hfss/Content/HFSS/PeakGain.htm)
- Ansys HFSS Help, Peak Realized Gain. [Gerçekleşmiş kazanç tanımı](https://ansyshelp.ansys.com/public/views/secured/electronics/v252/en/subsystems/hfss/Content/HFSS/PeakRealizedGain.htm)
