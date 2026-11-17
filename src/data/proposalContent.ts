export type Language = 'ms' | 'en';

export interface SectionKeywordMeta {
  id: string;
  anchor: string;
  number: string;
  keywords: string;
}

export interface EstimatorSelection {
  modeValue: string;
  modeLabel: string;
  participants: number;
  includeCustomTemplate: boolean;
  includeExtraClinic: boolean;
  totalAmountRm: number;
}

export const SECTION_META: SectionKeywordMeta[] = [
  { id: 'ringkasan', anchor: '#ringkasan', number: '01', keywords: 'ringkasan eksekutif executive summary matlamat goals tempoh duration standard integrity' },
  { id: 'pengenalan', anchor: '#pengenalan', number: '02', keywords: 'pengenalan introduction latar belakang background kompas strategik fasa phase workflow' },
  { id: 'masalah', anchor: '#masalah', number: '03', keywords: 'penyataan masalah problem statement cabaran challenges struktur angka financial mismatch' },
  { id: 'penyelesaian', anchor: '#penyelesaian', number: '04', keywords: 'penyelesaian solution templat template silang angka semakan modul silibus tentatif hari 1 hari 2 curriculum' },
  { id: 'objektif', anchor: '#objektif', number: '05', keywords: 'objektif objectives profil profile strategi strategy kewangan financial risiko risk' },
  { id: 'sasaran', anchor: '#sasaran', number: '06', keywords: 'sasaran peserta target participants pks sme permulaan startup pembiayaan financing grant' },
  { id: 'impak', anchor: '#impak', number: '07', keywords: 'impak peserta participant impact dokumen kewangan ai pembentangan presentation' },
  { id: 'agensi', anchor: '#agensi', number: '08', keywords: 'impak agensi agency impact pembimbing saringan kecekapan kpi perbandingan sebelum selepas comparison' },
  { id: 'kesimpulan', anchor: '#kesimpulan', number: '09', keywords: 'kesimpulan conclusion rumusan summary cadangan' },
  { id: 'penutup', anchor: '#penutup', number: '10', keywords: 'penutup closing pengesahan endorsement kelulusan approval tandatangan' },
  { id: 'jadual-kos', anchor: '#jadual-kos', number: '11', keywords: 'jadual pelaksanaan kos schedule investment bajet budget minggu week kalkulator estimator rm peserta' },
  { id: 'faq', anchor: '#faq', number: '12', keywords: 'faq soalan lazim questions jawapan answers data ai' },
];

export interface CurriculumSession {
  code: string;
  time: string;
  title: string;
  output: string;
  aiRole: string;
}

export interface CurriculumTab {
  id: 'day1' | 'day2' | 'followup';
  label: string;
  theme: string;
  sessions: CurriculumSession[];
}

export interface ProposalCopy {
  meta: {
    pageTitle: string;
    brandTitle: string;
    brandSubtitle: string;
  };
  nav: {
    links: { label: string; href: string }[];
    printButton: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    mobileMenuHeading: string;
    allSectionsLabel: string;
    tocHeading: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    languageLabel: string;
    highlights: {
      label: string;
      value: string;
      detail: string;
    }[];
    imageAlt: string;
    imageCaption: string;
  };
  toolbar: {
    searchPlaceholder: string;
    clearSearch: string;
    expandAll: string;
    collapseAll: string;
    jumpLabel: string;
    showingCount: string;
    ofTotal: string;
    sectionsWord: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilter: string;
  };
  sectionControls: {
    expand: string;
    collapse: string;
  };
  sections: {
    ringkasan: {
      title: string;
      subtitle: string;
      leadParagraph: string;
      cards: {
        title: string;
        description: string;
        metric: string;
      }[];
    };
    pengenalan: {
      title: string;
      subtitle: string;
      paragraphs: string[];
      flowTitle: string;
      flowSteps: {
        phase: string;
        focus: string;
      }[];
    };
    masalah: {
      title: string;
      subtitle: string;
      cards: {
        title: string;
        description: string;
        consequenceLabel: string;
        consequence: string;
      }[];
    };
    penyelesaian: {
      title: string;
      subtitle: string;
      description: string;
      points: {
        title: string;
        detail: string;
      }[];
      progressTitle: string;
      modules: {
        name: string;
        completion: string;
      }[];
      imageAlt: string;
      imageCaption: string;
      curriculumTitle: string;
      curriculumSubtitle: string;
      sessionOutputLabel: string;
      aiRoleLabel: string;
      curriculumTabs: CurriculumTab[];
    };
    objektif: {
      title: string;
      subtitle: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    sasaran: {
      title: string;
      subtitle: string;
      groups: {
        title: string;
        description: string;
        readiness: string;
      }[];
      checklistTitle: string;
      checklistItems: string[];
    };
    impak: {
      title: string;
      subtitle: string;
      outcomes: {
        title: string;
        description: string;
      }[];
    };
    agensi: {
      title: string;
      subtitle: string;
      benefits: {
        title: string;
        description: string;
      }[];
      comparisonTitle: string;
      comparisonHeaders: {
        dimension: string;
        before: string;
        after: string;
      };
      comparisonRows: {
        dimension: string;
        before: string;
        after: string;
      }[];
    };
    kesimpulan: {
      title: string;
      subtitle: string;
      body: string;
      pullQuote: string;
    };
    penutup: {
      title: string;
      subtitle: string;
      body: string;
      statusLabel: string;
      statusValue: string;
      formatLabel: string;
      formatValue: string;
      actionButton: string;
      printButton: string;
      signoffTitle: string;
      signoffRoles: {
        role: string;
        placeholder: string;
      }[];
    };
    jadualKos: {
      title: string;
      subtitle: string;
      timelineTitle: string;
      timeline: {
        period: string;
        activity: string;
      }[];
      investmentTitle: string;
      investment: {
        item: string;
        status: string;
      }[];
      estimator: {
        title: string;
        subtitle: string;
        modeLabel: string;
        modes: { value: string; label: string; baseCost: number; perHeadCost: number }[];
        participantsLabel: string;
        participantOptions: number[];
        addonsLabel: string;
        customTemplateLabel: string;
        customTemplateDesc: string;
        customTemplatePrice: number;
        extraClinicLabel: string;
        extraClinicDesc: string;
        extraClinicPrice: number;
        totalLabel: string;
        perParticipantLabel: string;
        deliverableLabel: string;
        deliverableUnit: string;
        disclaimer: string;
        applyButton: string;
      };
    };
    faq: {
      title: string;
      subtitle: string;
      items: {
        question: string;
        answer: string;
      }[];
    };
  };
  modal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    modeLabel: string;
    modes: { value: string; label: string }[];
    notesLabel: string;
    notesPlaceholder: string;
    presetBannerLabel: string;
    submitButton: string;
    cancelButton: string;
    errorRequired: string;
    errorEmail: string;
    successTitle: string;
    successBody: string;
    successSummaryLabel: string;
    closeButton: string;
  };
  footer: {
    title: string;
    description: string;
    copyright: string;
    backToTop: string;
  };
}

export const PROPOSAL_COPY: Record<Language, ProposalCopy> = {
  ms: {
    meta: {
      pageTitle: 'Proposal Digital — Bengkel Penyediaan Rancangan Perniagaan Berstrategi AI',
      brandTitle: 'Proposal Digital',
      brandSubtitle: 'Bengkel Rancangan Perniagaan',
    },
    nav: {
      links: [
        { label: 'Ringkasan', href: '#ringkasan' },
        { label: 'Metodologi', href: '#penyelesaian' },
        { label: 'Impak', href: '#impak' },
        { label: 'Jadual & Kos', href: '#jadual-kos' },
        { label: 'Soalan Lazim', href: '#faq' },
      ],
      printButton: 'Cetak / PDF',
      openMenuLabel: 'Buka menu navigasi',
      closeMenuLabel: 'Tutup menu navigasi',
      mobileMenuHeading: 'Navigasi Seksyen Proposal',
      allSectionsLabel: 'Semua 12 Seksyen',
      tocHeading: 'Isi Kandungan',
    },
    hero: {
      kicker: 'Proposal Rasmi Program Latihan Usahawan · Edisi 2026',
      headline: 'Bengkel Penyediaan Rancangan Perniagaan Berstrategi AI',
      subheadline:
        'Transformasi idea perniagaan kepada dokumen rasmi yang komprehensif, disokong oleh struktur data sahih, unjuran kewangan munasabah, dan bimbingan pakar beretika.',
      primaryCta: 'Terokai Proposal',
      secondaryCta: 'Kalkulator Kos & Jadual',
      languageLabel: 'Bahasa Paparan',
      highlights: [
        {
          label: 'Struktur Pelaksanaan',
          value: '2 Hari + 1 Sesi',
          detail: '10 modul praktikal berserta klinik semakan susulan',
        },
        {
          label: 'Pendekatan Teknologi',
          value: 'AI Beretika',
          detail: 'Struktur penulisan AI dengan 100% angka sahih peserta',
        },
        {
          label: 'Piawaian Dokumen',
          value: 'Sedia Pembiayaan',
          detail: 'Menepati format penilaian bank & agensi pembimbing',
        },
      ],
      imageAlt: 'Sesi bengkel penyediaan rancangan perniagaan bersama mentor dan usahawan',
      imageCaption: 'Gambaran suasana bimbingan strategik berstruktur bersama panel perunding.',
    },
    toolbar: {
      searchPlaceholder: 'Cari tajuk, modul, atau kata kunci dalam proposal...',
      clearSearch: 'Padam carian',
      expandAll: 'Buka Semua',
      collapseAll: 'Tutup Semua',
      jumpLabel: 'Lompat ke Seksyen',
      showingCount: 'Memaparkan',
      ofTotal: 'daripada',
      sectionsWord: 'seksyen',
      noResultsTitle: 'Tiada seksyen sepadan ditemui',
      noResultsDesc: 'Cuba kata kunci lain seperti kewangan, modul, sasaran, atau bajet.',
      resetFilter: 'Set Semula Carian',
    },
    sectionControls: {
      expand: 'Buka seksyen',
      collapse: 'Tutup seksyen',
    },
    sections: {
      ringkasan: {
        title: 'Ringkasan Eksekutif',
        subtitle: 'Intipati dan hala tuju strategik pelaksanaan program',
        leadParagraph:
          'Ringkasan eksekutif ini merumuskan komitmen penuh untuk melahirkan usahawan berdaya saing melalui dokumen perniagaan profesional yang memenuhi piawaian ketat institusi kewangan dan agensi pembiayaan.',
        cards: [
          {
            title: 'Matlamat Utama',
            description:
              'Membimbing peserta membina dokumen rancangan perniagaan yang lengkap bermula daripada profil syarikat hingga unjuran aliran kewangan.',
            metric: '10 Modul Teras Berstruktur',
          },
          {
            title: 'Tempoh Pelaksanaan',
            description:
              'Program intensif 2 hari latihan praktikal berserta 1 sesi semakan susulan bagi menjamin integriti angka kewangan.',
            metric: '2 Hari Bengkel + 1 Sesi Susulan',
          },
          {
            title: 'Standard & Integriti',
            description:
              'Memanfaatkan teknologi AI untuk struktur penulisan sambil mengekalkan ketepatan data sahih tanpa rekaan angka.',
            metric: '100% Data Perniagaan Sahih',
          },
        ],
      },
      pengenalan: {
        title: 'Pengenalan',
        subtitle: 'Latar belakang keperluan perancangan perniagaan moden',
        paragraphs: [
          'Dalam landskap ekonomi semasa, dokumen rancangan perniagaan bertindak sebagai kompas strategik syarikat. Namun begitu, ramai usahawan menghadapi kekangan dalam menterjemahkan idea perniagaan ke dalam bentuk dokumentasi rasmi yang menepati piawaian bank dan pelabur.',
          'Proposal ini mengetengahkan program bengkel berstruktur yang menggabungkan kepakaran mentor perniagaan dengan kecekapan alat kecerdasan buatan (AI) secara beretika bagi menghasilkan rancangan perniagaan berkualiti tinggi dalam masa yang pantas.',
        ],
        flowTitle: 'Fasa Aliran Bengkel',
        flowSteps: [
          { phase: 'Pra-Bengkel', focus: 'Senarai Semak & Pengumpulan Data' },
          { phase: 'Hari Pertama', focus: 'Analisis Pasaran & Strategi (Modul 01–05)' },
          { phase: 'Hari Kedua', focus: 'Unjuran Kewangan & Risiko (Modul 06–09)' },
          { phase: 'Sesi Susulan', focus: 'Semakan Silang & Draf Akhir (Modul 10)' },
        ],
      },
      masalah: {
        title: 'Penyataan Masalah',
        subtitle: 'Cabaran utama usahawan dalam penyediaan dokumen pembiayaan',
        cards: [
          {
            title: 'Struktur Dokumen Lemah',
            description:
              'Usahawan sering gagal menyusun maklumat perniagaan mengikut format piawaian institusi kewangan yang ditetapkan.',
            consequenceLabel: 'Implikasi Utama',
            consequence: 'Permohonan Ditolak Awal',
          },
          {
            title: 'Ketidakselarasan Angka',
            description:
              'Unjuran jualan dan struktur kos tidak sepadan dengan realiti operasi sebenar serta andaian kewangan yang munasabah.',
            consequenceLabel: 'Implikasi Utama',
            consequence: 'Keraguan Panel Penilai',
          },
          {
            title: 'Ketiadaan Panduan Pakar',
            description:
              'Proses penyediaan dokumen yang memakan masa tanpa bimbingan teknikal yang betul menyebabkan usahawan cepat berputus asa.',
            consequenceLabel: 'Implikasi Utama',
            consequence: 'Pembaziran Masa & Sumber',
          },
        ],
      },
      penyelesaian: {
        title: 'Penyelesaian & Kurikulum 10 Modul',
        subtitle: 'Pendekatan strategik, metodologi AI beretika, dan silibus latihan terperinci',
        description:
          'Bengkel ini menawarkan penyelesaian berstruktur menerusi 10 modul praktikal yang membimbing peserta menguruskan data sebenar, membina unjuran kewangan yang boleh diaudit, dan menggunakan AI sebagai pemudah cara penulisan yang beretika.',
        points: [
          {
            title: 'Templat Standard Profesional',
            detail: 'Menyediakan templat terbukti berkesan mengikut kehendak agensi pembiayaan dan institusi perbankan.',
          },
          {
            title: 'Penyemakan Silang Angka',
            detail: 'Memastikan unjuran aliran tunai selaras dengan pelan operasi, kapasiti pengeluaran, dan kos sebenar.',
          },
          {
            title: 'Sesi Semakan Susulan',
            detail: 'Ruang khas bersama perunding untuk membetulkan ketidakselarasan sebelum dokumen dihantar secara rasmi.',
          },
        ],
        progressTitle: 'Liputan Komponen Draf Rancangan Perniagaan',
        modules: [
          { name: 'Ringkasan Eksekutif & Profil Syarikat', completion: '100%' },
          { name: 'Analisis Pasaran & Strategi Pemasaran', completion: '100%' },
          { name: 'Pelan Operasi & Struktur Organisasi', completion: '100%' },
          { name: 'Pelan Kewangan & Lembaran Andaian', completion: '100%' },
        ],
        imageAlt: 'Perunding dan usahawan menyemak unjuran kewangan dan draf rancangan perniagaan',
        imageCaption: 'Semakan terperinci lembaran andaian kewangan bagi memastikan keselarasan antara operasi dan aliran tunai.',
        curriculumTitle: 'Perincian Tentatif & 10 Modul Bengkel',
        curriculumSubtitle: 'Pilih hari pelaksanaan untuk menyemak hasil kerja dan kawalan etika AI setiap sesi.',
        sessionOutputLabel: 'Hasil Draf',
        aiRoleLabel: 'Peranan AI',
        curriculumTabs: [
          {
            id: 'day1',
            label: 'Hari 1 · Strategi & Pasaran',
            theme: 'Membina asas perniagaan sahih, penawaran nilai, dan hala tuju pasaran',
            sessions: [
              {
                code: 'M01',
                time: '09:00 – 10:30',
                title: 'Pengenalan Piawaian Pembiayaan & Audit Data Pra-Bengkel',
                output: 'Senarai semak kesediaan data syarikat & matlamat pembiayaan',
                aiRole: 'Penyusunan profil latar belakang daripada nota fakta peserta',
              },
              {
                code: 'M02',
                time: '10:45 – 12:30',
                title: 'Profil Perniagaan, Produk & Kelebihan Penawaran Unik',
                output: 'Draf profil syarikat & matriks nilai produk/perkhidmatan',
                aiRole: 'Memperkemas gaya bahasa korporat tanpa mengubah fakta',
              },
              {
                code: 'M03',
                time: '14:00 – 15:15',
                title: 'Analisis Pasaran, Segmen Pelanggan & Pesaing',
                output: 'Jadual saiz pasaran sasaran & kedudukan kompetitif',
                aiRole: 'Membantu struktur SWOT & perbandingan ciri pesaing',
              },
              {
                code: 'M04',
                time: '15:30 – 16:30',
                title: 'Strategi Pemasaran & Saluran Jualan Bersepadu',
                output: 'Pelan kempen pemerolehan pelanggan & sasaran jualan bulanan',
                aiRole: 'Merangka pelan tindakan pemasaran mengikut bajet sebenar',
              },
              {
                code: 'M05',
                time: '16:30 – 17:30',
                title: 'Pelan Operasi, Kapasiti & Keperluan Tenaga Kerja',
                output: 'Carta alir operasi harian & jadual perjawatan',
                aiRole: 'Memformat SOP ringkas dan skop tugas kakitangan',
              },
            ],
          },
          {
            id: 'day2',
            label: 'Hari 2 · Kewangan & Risiko',
            theme: 'Mengesahkan andaian kewangan, aliran tunai, dan pengurusan risiko',
            sessions: [
              {
                code: 'M06',
                time: '09:00 – 10:45',
                title: 'Lembaran Andaian Jualan & Kos Operasi Sebenar',
                output: 'Jadual kos tetap, kos berubah & titik pulang modal',
                aiRole: 'Tiada penjanaan angka — 100% pengiraan manual & templat',
              },
              {
                code: 'M07',
                time: '11:00 – 12:45',
                title: 'Unjuran Aliran Tunai & Keperluan Modal Kerja',
                output: 'Unjuran aliran tunai 3 tahun & pecahan penggunaan dana',
                aiRole: 'Semakan konsistensi naratif antara pelan operasi & kos',
              },
              {
                code: 'M08',
                time: '14:00 – 15:30',
                title: 'Pengenalpastian Risiko Utama & Pelan Mitigasi',
                output: 'Daftar risiko operasi, kewangan, pasaran & pelan kontingensi',
                aiRole: 'Mencadangkan senario risiko industri untuk disahkan mentor',
              },
              {
                code: 'M09',
                time: '15:45 – 17:30',
                title: 'Penghasilan Ringkasan Eksekutif & Simulasi Pembentangan',
                output: 'Ringkasan eksekutif 2 halaman & dek pembentangan ringkas',
                aiRole: 'Meringkaskan keseluruhan draf rasmi ke dalam ringkasan padat',
              },
            ],
          },
          {
            id: 'followup',
            label: 'Sesi Susulan · Pengesahan',
            theme: 'Klinik semakan silang 1-ke-1 bersama perunding sebelum penghantaran rasmi',
            sessions: [
              {
                code: 'M10',
                time: 'Minggu ke-4 (Jadual Berkumpulan / Slot Klinik)',
                title: 'Klinik Semakan Silang Angka, Format Agensi & Pengesahan Akhir',
                output: 'Dokumen Rancangan Perniagaan Akhir Sedia Hantar + Senarai Semak Panel',
                aiRole: 'Audit tata bahasa akhir & keseragaman format dokumen',
              },
            ],
          },
        ],
      },
      objektif: {
        title: 'Objektif Program',
        subtitle: 'Sasaran terperinci pencapaian peserta sepanjang bengkel',
        items: [
          {
            title: 'Profil Perniagaan',
            description:
              'Memperincikan profil syarikat, produk atau perkhidmatan, segmen pelanggan sasaran, serta kelebihan penawaran unik.',
          },
          {
            title: 'Strategi & Operasi',
            description:
              'Menyusun strategi pemasaran, pelan operasi harian, keperluan tenaga kerja, dan jadual pelaksanaan projek.',
          },
          {
            title: 'Unjuran Kewangan',
            description:
              'Menyediakan unjuran jualan, kos, aliran tunai, dan keperluan modal berasaskan andaian yang telus dan munasabah.',
          },
          {
            title: 'Pengurusan Risiko',
            description:
              'Mengenal pasti risiko perniagaan utama serta merangka langkah mitigasi yang sepadan dengan keupayaan syarikat.',
          },
        ],
      },
      sasaran: {
        title: 'Sasaran Peserta & Persediaan Awal',
        subtitle: 'Kumpulan sasaran serta keperluan data asas yang perlu dibawa peserta',
        groups: [
          {
            title: 'Usahawan PKS',
            description:
              'Pemilik perniagaan kecil dan sederhana yang ingin menstrukturkan semula pelan perniagaan untuk pengembangan operasi berskala besar.',
            readiness: 'Fokus Pengembangan & Skala',
          },
          {
            title: 'Usahawan Permulaan',
            description:
              'Individu berwawasan yang mempunyai produk inovatif dan memerlukan draf rancangan rasmi untuk pembentangan kepada pelabur.',
            readiness: 'Fokus Validasi & Pelabur',
          },
          {
            title: 'Pemohon Pembiayaan',
            description:
              'Usahawan yang bersiap sedia memohon pinjaman perniagaan, pembiayaan mikro, atau geran daripada agensi kerajaan dan bank.',
            readiness: 'Fokus Kelulusan Pembiayaan',
          },
        ],
        checklistTitle: 'Senarai Semak Pra-Bengkel (Perlu Disediakan Peserta pada Minggu 1)',
        checklistItems: [
          'Sijil pendaftaran perniagaan (SSM) & profil ringkas pemilik',
          'Rekod jualan bulanan dan penyata bank 3–6 bulan terkini (jika beroperasi)',
          'Senarai kos tetap (sewa, gaji, utiliti) dan anggaran kos bahan mentah',
          'Komputer riba peribadi untuk latihan penyediaan dokumen secara langsung',
        ],
      },
      impak: {
        title: 'Impak Kepada Peserta',
        subtitle: 'Manfaat langsung yang diperoleh oleh peserta selepas menyertai bengkel',
        outcomes: [
          {
            title: 'Draf Lengkap & Profesional',
            description:
              'Memiliki satu draf rancangan perniagaan komprehensif yang merangkumi semua komponen penilaian wajib.',
          },
          {
            title: 'Kemahiran Analisis Kewangan',
            description:
              'Keupayaan membina lembaran andaian kewangan dan unjuran berasaskan data operasi sahih yang munasabah.',
          },
          {
            title: 'Keyakinan Pembentangan',
            description:
              'Lebih bersedia membentangkan hala tuju syarikat di hadapan panel penilai, pegawai bank, atau pelabur strategik.',
          },
          {
            title: 'Celik Teknologi AI Beretika',
            description:
              'Mahir memanfaatkan alat AI untuk menyusun struktur penulisan dokumen tanpa menjejaskan integriti angka perniagaan.',
          },
        ],
      },
      agensi: {
        title: 'Impak Kepada Agensi Pembimbing',
        subtitle: 'Nilai tambah operasi dan penanda aras kualiti bagi agensi penganjur',
        benefits: [
          {
            title: 'Kualiti Permohonan Tinggi',
            description:
              'Mengurangkan kesilapan asas dalam permohonan pembiayaan usahawan, sekali gus memudahkan proses semakan dalaman agensi.',
          },
          {
            title: 'Kecekapan Operasi',
            description:
              'Mempercepatkan kitaran penilaian dokumen melalui penggunaan templat seragam dan piawaian data yang telus.',
          },
          {
            title: 'Peningkatan Kadar Kejayaan',
            description:
              'Meningkatkan kadar kelulusan pembiayaan dan kelangsungan komersial bagi program pembangunan usahawan agensi.',
          },
        ],
        comparisonTitle: 'Penanda Aras Perubahan Kualiti Dokumen Permohonan',
        comparisonHeaders: {
          dimension: 'Dimensi Penilaian',
          before: 'Situasi Lazim (Sebelum Bengkel)',
          after: 'Sasaran Output (Selepas Bengkel)',
        },
        comparisonRows: [
          {
            dimension: 'Struktur & Format Dokumen',
            before: 'Penulisan bebas, tidak seragam, dan sukar disemak oleh pegawai penilai.',
            after: 'Mematuhi urutan bahagian rasmi serta templat piawaian agensi pembiayaan.',
          },
          {
            dimension: 'Keselarasan Angka Kewangan',
            before: 'Angka jualan dan kos tidak berkait dengan kapasiti operasi sebenar.',
            after: 'Unjuran aliran tunai disokong oleh lembaran andaian yang diaudit silang.',
          },
          {
            dimension: 'Penggunaan Teknologi AI',
            before: 'Risiko teks umum tanpa fakta syarikat atau angka rekaan automatik.',
            after: 'AI hanya menyusun struktur bahasa; 100% data dan angka kekal sahih milik peserta.',
          },
          {
            dimension: 'Kesediaan Pembentangan Panel',
            before: 'Pemilik sukar menjelaskan pengiraan modal kerja atau langkah mitigasi risiko.',
            after: 'Usahawan memahami setiap andaian kewangan dan bersedia menjawab soalan panel.',
          },
        ],
      },
      kesimpulan: {
        title: 'Kesimpulan',
        subtitle: 'Rumusan keseluruhan cadangan penganjuran program',
        body: 'Cadangan Bengkel Penyediaan Rancangan Perniagaan ini menawarkan modul yang komprehensif, menggabungkan latihan praktikal selama dua hari dan sesi susulan yang kritikal. Melalui panduan struktur yang betul, pengiraan kewangan yang munasabah, serta penggunaan AI yang beretika, program ini menjadi landasan terbaik melahirkan usahawan yang berdaya tahan dan berdaya saing tinggi di peringkat pasaran domestik mahupun global.',
        pullQuote:
          'Rancangan perniagaan yang kukuh bukan sekadar syarat pembiayaan, tetapi pelan tindakan terukur untuk kelestarian perniagaan.',
      },
      penutup: {
        title: 'Penutup & Pengesahan',
        subtitle: 'Langkah seterusnya untuk kelulusan dan pelaksanaan program',
        body: 'Proposal digital ini dikemukakan untuk pertimbangan dan kelulusan pihak pengurusan agensi. Pihak pelaksana bersedia mengadakan perbincangan lanjut bagi menyesuaikan modul, tarikh pelaksanaan, serta format khusus agensi demi kejayaan program pembangunan usahawan ini.',
        statusLabel: 'Status Cadangan',
        statusValue: 'Sedia untuk Pertimbangan & Penyesuaian Agensi',
        formatLabel: 'Format Dokumen',
        formatValue: 'Proposal Digital Interaktif Dwibahasa (BM / EN)',
        actionButton: 'Mohon Perbincangan Program',
        printButton: 'Muat Turun / Cetak PDF',
        signoffTitle: 'Ruangan Pengesahan Rasmi (Untuk Kegunaan Cetakan / Kelulusan Agensi)',
        signoffRoles: [
          { role: 'Disediakan oleh', placeholder: 'Ketua Perunding / Penyelaras Program' },
          { role: 'Disemak oleh', placeholder: 'Pegawai Pembangunan Usahawan Agensi' },
          { role: 'Diluluskan oleh', placeholder: 'Pengarah / Ketua Jabatan Agensi' },
        ],
      },
      jadualKos: {
        title: 'Jadual Pelaksanaan & Kalkulator Anggaran Kos',
        subtitle: 'Garis panduan masa 4 minggu dan anggaran pelaburan mengikut skala kohort',
        timelineTitle: 'Garis Masa Pelaksanaan (4 Minggu)',
        timeline: [
          { period: 'Minggu 1', activity: 'Pendaftaran peserta & agihan senarai semak data pra-bengkel' },
          { period: 'Minggu 2', activity: 'Hari 1 Bengkel: Analisis Pasaran, Penawaran Nilai & Strategi' },
          { period: 'Minggu 3', activity: 'Hari 2 Bengkel: Pelan Kewangan, Aliran Tunai & Pengurusan Risiko' },
          { period: 'Minggu 4', activity: 'Sesi Susulan: Semakan Silang & Pengesahan Draf Akhir' },
        ],
        investmentTitle: 'Komponen Pelaburan Program',
        investment: [
          { item: 'Modul & Templat Rasmi Piawaian Agensi', status: 'Termasuk' },
          { item: 'Penyeliaan Mentor & Perunding Berpengalaman', status: 'Disediakan' },
          { item: 'Alat & Panduan Latihan AI Beretika', status: 'Termasuk' },
          { item: 'Pakej Sesi Semakan Susulan Pasca-Bengkel', status: 'Eksklusif' },
        ],
        estimator: {
          title: 'Kalkulator Anggaran Pelaburan Program (Indikatif)',
          subtitle: 'Laraskan mod pelaksanaan dan saiz kohort untuk melihat anggaran kos serta melampirkannya ke permohonan rasmi.',
          modeLabel: 'Mod Pelaksanaan',
          modes: [
            { value: 'physical', label: 'Fizikal (Bersemuka)', baseCost: 4800, perHeadCost: 180 },
            { value: 'hybrid', label: 'Hibrid (Fizikal + Klinik Online)', baseCost: 4200, perHeadCost: 150 },
            { value: 'online', label: 'Dalam Talian Sepenuhnya', baseCost: 3400, perHeadCost: 110 },
          ],
          participantsLabel: 'Saiz Kohort Peserta',
          participantOptions: [20, 30, 40],
          addonsLabel: 'Pilihan Tambahan Agensi',
          customTemplateLabel: 'Penyesuaian Templat Khusus Agensi',
          customTemplateDesc: 'Penjajaran format khas borang geran/pembiayaan agensi penganjur',
          customTemplatePrice: 950,
          extraClinicLabel: 'Klinik Semakan Tambahan 1-ke-1',
          extraClinicDesc: 'Sesi audit kewangan tambahan bagi projek berimpak tinggi',
          extraClinicPrice: 1200,
          totalLabel: 'Anggaran Pelaburan Keseluruhan',
          perParticipantLabel: 'Purata Kos / Peserta',
          deliverableLabel: 'Hasil Dijangka',
          deliverableUnit: 'Draf RP Lengkap',
          disclaimer: 'Anggaran indikatif tidak termasuk kos sewaan dewan atau jamuan sekiranya disediakan oleh agensi.',
          applyButton: 'Lampirkan Anggaran ke Permohonan',
        },
      },
      faq: {
        title: 'Soalan Lazim (FAQ)',
        subtitle: 'Maklumat tambahan berkaitan pelaksanaan dan penyertaan bengkel',
        items: [
          {
            question: 'Adakah peserta perlu membawa data kewangan sendiri?',
            answer:
              'Ya. Peserta amat digalakkan membawa rekod jualan asas, senarai perbelanjaan semasa, serta maklumat operasi perniagaan sedia ada bagi memastikan unjuran yang dibina adalah realistik dan boleh dipertahankan.',
          },
          {
            question: 'Bagaimanakah teknologi AI digunakan dalam bengkel ini?',
            answer:
              'AI digunakan secara beretika sebagai pembantu menyusun struktur penulisan, kejelasan bahasa, dan semakan logik kandungan. Semua angka kewangan tetap dikira dan disemak secara teliti oleh peserta bersama perunding.',
          },
          {
            question: 'Bolehkah modul disesuaikan mengikut templat agensi penganjur?',
            answer:
              'Boleh. Sebelum pelaksanaan Minggu 1, pihak pelaksana akan menyelaraskan struktur templat dan keperluan penilaian khusus agensi pembimbing atau institusi pembiayaan yang terlibat.',
          },
          {
            question: 'Apakah bentuk hasil akhir yang dibawa pulang oleh peserta?',
            answer:
              'Setiap peserta akan melengkapkan satu draf rancangan perniagaan berstruktur lengkap beserta lembaran kerja unjuran kewangan yang telah melalui semakan susulan bersama perunding.',
          },
        ],
      },
    },
    modal: {
      title: 'Mohon Perbincangan & Penyesuaian Program',
      subtitle: 'Lengkapkan maklumat di bawah untuk menjadualkan sesi taklimat ringkas atau permohonan sebut harga rasmi bagi pihak agensi.',
      nameLabel: 'Nama Pegawai / Penganjur',
      namePlaceholder: 'cth. Ahmad Zaki bin Hassan',
      orgLabel: 'Nama Agensi / Organisasi',
      orgPlaceholder: 'cth. Perbadanan Usahawan Negeri',
      emailLabel: 'Alamat E-mel Rasmi',
      emailPlaceholder: 'pegawai@agensi.gov.my',
      modeLabel: 'Mod Pelaksanaan Pilihan',
      modes: [
        { value: 'physical', label: 'Bengkel Fizikal (Bersemuka)' },
        { value: 'hybrid', label: 'Hibrid (Bengkel Fizikal + Susulan Dalam Talian)' },
        { value: 'online', label: 'Dalam Talian Sepenuhnya' },
      ],
      notesLabel: 'Catatan atau Keperluan Khusus (Pilihan)',
      notesPlaceholder: 'Anggaran bilangan peserta, tarikh cadangan, atau templat khusus agensi...',
      presetBannerLabel: 'Anggaran Dilampirkan daripada Kalkulator',
      submitButton: 'Sediakan Ringkasan Permohonan',
      cancelButton: 'Batal',
      errorRequired: 'Sila lengkapkan nama pegawai, organisasi, dan e-mel rasmi.',
      errorEmail: 'Sila masukkan format alamat e-mel yang sah.',
      successTitle: 'Ringkasan Permohonan Disediakan',
      successBody:
        'Rekod cadangan perbincangan anda telah diformatkan. Anda boleh mencetak halaman ini atau merujuk butiran berikut dalam komunikasi rasmi.',
      successSummaryLabel: 'Butiran Permohonan',
      closeButton: 'Tutup',
    },
    footer: {
      title: 'Proposal Digital — Bengkel Penyediaan Rancangan Perniagaan Berstrategi AI',
      description: 'Dokumen cadangan interaktif dwibahasa yang dioptimumkan untuk paparan desktop, mudah alih, serta cetakan PDF rasmi.',
      copyright: '© 2026 Hak Cipta Terpelihara.',
      backToTop: 'Kembali ke Atas',
    },
  },
  en: {
    meta: {
      pageTitle: 'Digital Proposal — AI-Assisted Business Plan Preparation Workshop',
      brandTitle: 'Digital Proposal',
      brandSubtitle: 'Business Plan Workshop',
    },
    nav: {
      links: [
        { label: 'Summary', href: '#ringkasan' },
        { label: 'Methodology', href: '#penyelesaian' },
        { label: 'Impact', href: '#impak' },
        { label: 'Schedule & Cost', href: '#jadual-kos' },
        { label: 'FAQ', href: '#faq' },
      ],
      printButton: 'Print / PDF',
      openMenuLabel: 'Open navigation menu',
      closeMenuLabel: 'Close navigation menu',
      mobileMenuHeading: 'Proposal Section Navigation',
      allSectionsLabel: 'All 12 Sections',
      tocHeading: 'Table of Contents',
    },
    hero: {
      kicker: 'Official Entrepreneurship Training Proposal · 2026 Edition',
      headline: 'AI-Assisted Business Plan Preparation Workshop',
      subheadline:
        'Transforming business ideas into comprehensive official dossiers backed by verified operational data, realistic financial projections, and ethical expert mentorship.',
      primaryCta: 'Explore Proposal',
      secondaryCta: 'Cost Estimator & Schedule',
      languageLabel: 'Display Language',
      highlights: [
        {
          label: 'Program Structure',
          value: '2 Days + 1 Session',
          detail: '10 hands-on modules plus post-workshop review clinic',
        },
        {
          label: 'Technology Approach',
          value: 'Ethical AI',
          detail: 'AI-structured writing grounded in 100% verified client data',
        },
        {
          label: 'Document Standard',
          value: 'Funding-Ready',
          detail: 'Aligned with banking & development agency evaluation rubrics',
        },
      ],
      imageAlt: 'Executive business plan workshop session with consultants and entrepreneurs',
      imageCaption: 'Structured strategic mentoring session with certified business consultants.',
    },
    toolbar: {
      searchPlaceholder: 'Search headings, modules, or keywords in proposal...',
      clearSearch: 'Clear search',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      jumpLabel: 'Jump to Section',
      showingCount: 'Showing',
      ofTotal: 'of',
      sectionsWord: 'sections',
      noResultsTitle: 'No matching sections found',
      noResultsDesc: 'Try another keyword such as finance, module, participants, or budget.',
      resetFilter: 'Reset Search',
    },
    sectionControls: {
      expand: 'Expand section',
      collapse: 'Collapse section',
    },
    sections: {
      ringkasan: {
        title: 'Executive Summary',
        subtitle: 'Core intent and strategic direction for program delivery',
        leadParagraph:
          'This executive summary outlines our commitment to equipping entrepreneurs with investor- and lender-grade business plans that meet the rigorous evaluation standards of financial institutions and development agencies.',
        cards: [
          {
            title: 'Core Objective',
            description:
              'Guide participants to author a complete business plan covering everything from company profile to multi-year financial cash-flow projections.',
            metric: '10 Structured Core Modules',
          },
          {
            title: 'Delivery Duration',
            description:
              'An intensive 2-day practical workshop paired with 1 dedicated follow-up review session to verify financial integrity.',
            metric: '2-Day Workshop + 1 Follow-Up',
          },
          {
            title: 'Standards & Integrity',
            description:
              'Leverage AI tools to organize prose and structure while enforcing strict accuracy with zero fabricated financial figures.',
            metric: '100% Verified Data',
          },
        ],
      },
      pengenalan: {
        title: 'Introduction',
        subtitle: 'Context and demand for modern structured business planning',
        paragraphs: [
          'In today’s economic landscape, a business plan serves as a company’s strategic compass. However, many entrepreneurs struggle to translate practical business ideas into formal documentation that meets banking and investor requirements.',
          'This proposal introduces a structured workshop combining seasoned business mentorship with ethical Artificial Intelligence (AI) workflows to produce high-caliber business plans efficiently.',
        ],
        flowTitle: 'Workshop Delivery Phases',
        flowSteps: [
          { phase: 'Pre-Workshop', focus: 'Checklist & Data Gathering' },
          { phase: 'Day One', focus: 'Market Analysis & Strategy (Modules 01–05)' },
          { phase: 'Day Two', focus: 'Financials & Risk Mitigation (Modules 06–09)' },
          { phase: 'Follow-Up Session', focus: 'Cross-Check & Final Draft (Module 10)' },
        ],
      },
      masalah: {
        title: 'Problem Statement',
        subtitle: 'Key hurdles faced by entrepreneurs preparing funding dossiers',
        cards: [
          {
            title: 'Weak Document Structure',
            description:
              'Entrepreneurs frequently struggle to organize operational facts into the standardized formats expected by financing institutions.',
            consequenceLabel: 'Primary Impact',
            consequence: 'Early Application Rejection',
          },
          {
            title: 'Misaligned Financial Figures',
            description:
              'Revenue forecasts and cost structures often fail to align with real operational capacity and defensible financial assumptions.',
            consequenceLabel: 'Primary Impact',
            consequence: 'Evaluator Skepticism',
          },
          {
            title: 'Lack of Technical Guidance',
            description:
              'Drafting an official plan without structured consulting support is time-consuming and leads many applicants to abandon the process.',
            consequenceLabel: 'Primary Impact',
            consequence: 'Wasted Time & Resources',
          },
        ],
      },
      penyelesaian: {
        title: 'Proposed Solution & 10-Module Curriculum',
        subtitle: 'Strategic methodology, ethical AI guardrails, and detailed training syllabus',
        description:
          'This workshop delivers a structured solution through 10 practical modules that teach participants to curate real operational data, build auditable financial forecasts, and apply AI responsibly as a writing assistant.',
        points: [
          {
            title: 'Professional Standard Templates',
            detail: 'Provides proven templates aligned directly with financing agency and banking evaluation criteria.',
          },
          {
            title: 'Financial Cross-Verification',
            detail: 'Ensures projected cash flows match operational plans, production capacity, and realistic cost structures.',
          },
          {
            title: 'Dedicated Follow-Up Review',
            detail: 'A structured review clinic with consultants to resolve discrepancies prior to formal submission.',
          },
        ],
        progressTitle: 'Complete Business Plan Draft Coverage',
        modules: [
          { name: 'Executive Summary & Company Profile', completion: '100%' },
          { name: 'Market Analysis & Marketing Strategy', completion: '100%' },
          { name: 'Operations Plan & Organizational Chart', completion: '100%' },
          { name: 'Financial Plan & Assumption Sheets', completion: '100%' },
        ],
        imageAlt: 'Consultant and entrepreneur reviewing financial projections and draft business plan',
        imageCaption: 'Detailed walkthrough of financial assumption sheets ensuring alignment between operations and cash flow.',
        curriculumTitle: 'Detailed Syllabus & 10 Workshop Modules',
        curriculumSubtitle: 'Select a program day to inspect deliverable outputs and AI governance per session.',
        sessionOutputLabel: 'Draft Output',
        aiRoleLabel: 'AI Role',
        curriculumTabs: [
          {
            id: 'day1',
            label: 'Day 1 · Strategy & Market',
            theme: 'Establishing verified company facts, value proposition, and market execution',
            sessions: [
              {
                code: 'M01',
                time: '09:00 – 10:30',
                title: 'Financing Rubric Overview & Pre-Workshop Data Audit',
                output: 'Data readiness checklist & clear funding objective statement',
                aiRole: 'Structuring company background notes supplied by the founder',
              },
              {
                code: 'M02',
                time: '10:45 – 12:30',
                title: 'Business Profile, Offerings & Unique Value Proposition',
                output: 'Company profile draft & product/service differentiation matrix',
                aiRole: 'Polishing corporate clarity while preserving factual claims',
              },
              {
                code: 'M03',
                time: '14:00 – 15:15',
                title: 'Market Sizing, Customer Segments & Competitor Analysis',
                output: 'Target market table & competitive positioning grid',
                aiRole: 'Structuring SWOT analysis and competitor feature comparisons',
              },
              {
                code: 'M04',
                time: '15:30 – 16:30',
                title: 'Marketing Strategy & Integrated Sales Channels',
                output: 'Customer acquisition roadmap & monthly sales target drivers',
                aiRole: 'Drafting channel action plans constrained by actual budget',
              },
              {
                code: 'M05',
                time: '16:30 – 17:30',
                title: 'Operations Plan, Capacity & Workforce Requirements',
                output: 'Daily workflow chart & organizational staffing schedule',
                aiRole: 'Formatting concise SOP steps and role descriptions',
              },
            ],
          },
          {
            id: 'day2',
            label: 'Day 2 · Financials & Risk',
            theme: 'Validating financial assumptions, cash flows, and enterprise risk mitigation',
            sessions: [
              {
                code: 'M06',
                time: '09:00 – 10:45',
                title: 'Sales Assumptions & Real Operating Cost Schedule',
                output: 'Fixed/variable cost breakdown & break-even calculation',
                aiRole: 'Zero AI-generated figures — 100% manual math & verified templates',
              },
              {
                code: 'M07',
                time: '11:00 – 12:45',
                title: 'Cash-Flow Projections & Working Capital Allocation',
                output: '3-year cash-flow forecast & itemized capital utilization table',
                aiRole: 'Checking narrative consistency between operations and costs',
              },
              {
                code: 'M08',
                time: '14:00 – 15:30',
                title: 'Key Risk Identification & Practical Mitigation Plan',
                output: 'Operational, market, and financial risk register with contingencies',
                aiRole: 'Surfacing sector risk scenarios for consultant validation',
              },
              {
                code: 'M09',
                time: '15:45 – 17:30',
                title: 'Executive Summary Synthesis & Panel Pitch Simulation',
                output: '2-page executive summary & concise evaluation pitch deck',
                aiRole: 'Distilling verified plan sections into a tight executive brief',
              },
            ],
          },
          {
            id: 'followup',
            label: 'Follow-Up · Verification',
            theme: '1-on-1 cross-verification clinic with consultants prior to formal submission',
            sessions: [
              {
                code: 'M10',
                time: 'Week 4 (Scheduled Cohort / Clinic Slots)',
                title: 'Financial Cross-Audit, Agency Formatting & Final Sign-Off',
                output: 'Submission-Ready Business Plan Dossier + Panel Readiness Checklist',
                aiRole: 'Final grammar audit & document formatting consistency check',
              },
            ],
          },
        ],
      },
      objektif: {
        title: 'Program Objectives',
        subtitle: 'Specific participant outcomes targeted throughout the workshop',
        items: [
          {
            title: 'Business Profile',
            description:
              'Articulate company background, product or service offerings, target customer segments, and unique value proposition.',
          },
          {
            title: 'Strategy & Operations',
            description:
              'Establish marketing execution plans, day-to-day operational workflows, staffing needs, and project milestones.',
          },
          {
            title: 'Financial Projections',
            description:
              'Build sales forecasts, cost schedules, cash-flow statements, and capital requirements on transparent assumptions.',
          },
          {
            title: 'Risk Management',
            description:
              'Identify critical operational and market risks alongside practical mitigation measures matched to business capacity.',
          },
        ],
      },
      sasaran: {
        title: 'Target Participants & Pre-Workshop Readiness',
        subtitle: 'Audience profiles and baseline records participants bring into Week 1',
        groups: [
          {
            title: 'SME Entrepreneurs',
            description:
              'Small and medium enterprise owners seeking to formalize and restructure business plans for larger-scale expansion.',
            readiness: 'Focus: Scaling & Restructuring',
          },
          {
            title: 'Startup Founders',
            description:
              'Early-stage founders with viable products requiring formal documentation to pitch angel investors or venture partners.',
            readiness: 'Focus: Validation & Pitching',
          },
          {
            title: 'Financing Applicants',
            description:
              'Entrepreneurs preparing to apply for business loans, micro-financing facilities, or government agency grants.',
            readiness: 'Focus: Funding Approval',
          },
        ],
        checklistTitle: 'Pre-Workshop Readiness Checklist (Prepared by Participants in Week 1)',
        checklistItems: [
          'Business registration certificate (SSM) & brief founder profile',
          'Monthly sales records and 3–6 months of bank statements (for operating firms)',
          'List of fixed overheads (rent, payroll, utilities) and estimated unit/material costs',
          'Personal laptop for live hands-on document and spreadsheet drafting',
        ],
      },
      impak: {
        title: 'Impact on Participants',
        subtitle: 'Direct capabilities and deliverables gained upon completing the workshop',
        outcomes: [
          {
            title: 'Complete Professional Draft',
            description:
              'Walk away with a cohesive business plan draft covering every mandatory section required by evaluators.',
          },
          {
            title: 'Financial Analysis Literacy',
            description:
              'Practical ability to construct financial assumption sheets and projections anchored in authentic business records.',
          },
          {
            title: 'Pitch & Presentation Readiness',
            description:
              'Greater confidence defending business strategy and numbers before evaluation panels, bank officers, or investors.',
          },
          {
            title: 'Ethical AI Proficiency',
            description:
              'Fluency in leveraging AI tools to accelerate document drafting without compromising financial data integrity.',
          },
        ],
      },
      agensi: {
        title: 'Impact on Guiding Agencies',
        subtitle: 'Operational value and measurable quality benchmarks for organizing institutions',
        benefits: [
          {
            title: 'Higher Application Quality',
            description:
              'Reduces basic documentation errors in entrepreneur financing submissions, streamlining internal agency screening.',
          },
          {
            title: 'Operational Efficiency',
            description:
              'Shortens evaluation turnaround cycles through standardized templates and transparent financial assumptions.',
          },
          {
            title: 'Improved Success Rates',
            description:
              'Boosts financing approval rates and long-term commercial viability across agency entrepreneur development cohorts.',
          },
        ],
        comparisonTitle: 'Submission Quality Benchmark: Before vs. After Workshop',
        comparisonHeaders: {
          dimension: 'Evaluation Dimension',
          before: 'Typical Baseline (Before Workshop)',
          after: 'Target Standard (After Workshop)',
        },
        comparisonRows: [
          {
            dimension: 'Document Structure & Formatting',
            before: 'Unstructured prose, inconsistent sections, difficult for officers to review.',
            after: 'Follows official section sequence and standardized financing agency templates.',
          },
          {
            dimension: 'Financial Figure Alignment',
            before: 'Revenue targets disconnected from staffing, pricing, or production capacity.',
            after: 'Cash-flow projections backed by cross-verified operational assumption sheets.',
          },
          {
            dimension: 'Use of AI Technology',
            before: 'Risk of generic filler copy or hallucinated statistics without evidence.',
            after: 'AI organizes structure and clarity only; 100% of figures belong to the business.',
          },
          {
            dimension: 'Panel Defense Readiness',
            before: 'Founders struggle to justify working capital requests or risk contingencies.',
            after: 'Participants understand every assumption and present confidently to evaluators.',
          },
        ],
      },
      kesimpulan: {
        title: 'Conclusion',
        subtitle: 'Overall summary of the proposed workshop initiative',
        body: 'This Business Plan Preparation Workshop proposal delivers a cohesive curriculum combining two days of hands-on practice with a critical follow-up review clinic. By uniting sound structural discipline, defensible financial modeling, and ethical AI usage, the program provides an effective launchpad for building resilient, competitive enterprises.',
        pullQuote:
          'A rigorous business plan is more than a financing prerequisite—it is a measurable blueprint for sustainable enterprise growth.',
      },
      penutup: {
        title: 'Closing & Endorsement',
        subtitle: 'Next steps for management review, customization, and approval',
        body: 'This digital proposal is submitted for consideration and approval by agency leadership. The delivery team welcomes further discussion to tailor curriculum emphasis, scheduling, and agency-specific reporting templates to ensure program success.',
        statusLabel: 'Proposal Status',
        statusValue: 'Ready for Review & Agency Customization',
        formatLabel: 'Document Format',
        formatValue: 'Interactive Bilingual Digital Dossier (BM / EN)',
        actionButton: 'Request Program Discussion',
        printButton: 'Download / Print PDF',
        signoffTitle: 'Official Endorsement Block (For Printed / Agency Approval Use)',
        signoffRoles: [
          { role: 'Prepared by', placeholder: 'Lead Consultant / Program Coordinator' },
          { role: 'Reviewed by', placeholder: 'Agency Entrepreneurship Officer' },
          { role: 'Approved by', placeholder: 'Director / Head of Department' },
        ],
      },
      jadualKos: {
        title: 'Implementation Schedule & Cost Estimator',
        subtitle: '4-week delivery timeline and interactive investment estimator by cohort size',
        timelineTitle: '4-Week Execution Timeline',
        timeline: [
          { period: 'Week 1', activity: 'Participant registration & distribution of pre-workshop data checklist' },
          { period: 'Week 2', activity: 'Workshop Day 1: Market Analysis, Value Proposition & Strategy' },
          { period: 'Week 3', activity: 'Workshop Day 2: Financial Modeling, Cash Flow & Risk Mitigation' },
          { period: 'Week 4', activity: 'Follow-Up Clinic: Cross-Verification & Final Draft Sign-Off' },
        ],
        investmentTitle: 'Program Investment Components',
        investment: [
          { item: 'Agency-Standard Modules & Official Templates', status: 'Included' },
          { item: 'Experienced Mentor & Consultant Supervision', status: 'Provided' },
          { item: 'Ethical AI Training Guides & Prompt Workflows', status: 'Included' },
          { item: 'Post-Workshop Follow-Up Review Package', status: 'Exclusive' },
        ],
        estimator: {
          title: 'Interactive Program Investment Estimator (Indicative)',
          subtitle: 'Adjust delivery mode and cohort size to preview indicative budgeting and attach it to your discussion request.',
          modeLabel: 'Delivery Mode',
          modes: [
            { value: 'physical', label: 'In-Person Workshop', baseCost: 4800, perHeadCost: 180 },
            { value: 'hybrid', label: 'Hybrid (In-Person + Online Clinic)', baseCost: 4200, perHeadCost: 150 },
            { value: 'online', label: 'Fully Online Cohort', baseCost: 3400, perHeadCost: 110 },
          ],
          participantsLabel: 'Cohort Size',
          participantOptions: [20, 30, 40],
          addonsLabel: 'Optional Agency Enhancements',
          customTemplateLabel: 'Agency-Specific Template Alignment',
          customTemplateDesc: 'Tailoring workbooks to match your agency’s grant or loan submission form',
          customTemplatePrice: 950,
          extraClinicLabel: 'Extended 1-on-1 Financial Review Clinic',
          extraClinicDesc: 'Additional audit slot for high-capital or complex enterprise applicants',
          extraClinicPrice: 1200,
          totalLabel: 'Indicative Total Investment',
          perParticipantLabel: 'Average Cost / Participant',
          deliverableLabel: 'Expected Output',
          deliverableUnit: 'Complete Business Plans',
          disclaimer: 'Indicative figures exclude physical venue rental and catering if hosted directly by the agency.',
          applyButton: 'Attach Estimate to Request',
        },
      },
      faq: {
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: 'Additional details on workshop requirements and execution',
        items: [
          {
            question: 'Do participants need to bring their own financial data?',
            answer:
              'Yes. Participants are strongly encouraged to bring baseline sales records, current operating expense lists, and existing business details so that projections remain realistic and defensible.',
          },
          {
            question: 'How is AI technology used during the workshop?',
            answer:
              'AI is used strictly and ethically as an assistant to structure prose, refine clarity, and check logical consistency. All financial figures are calculated and verified directly by participants with consultant guidance.',
          },
          {
            question: 'Can the templates be customized to match our agency’s official format?',
            answer:
              'Yes. During Week 1 preparation, our team aligns the workshop templates with the exact evaluation criteria and formatting guidelines of the sponsoring agency or financing institution.',
          },
          {
            question: 'What concrete deliverable does each participant leave with?',
            answer:
              'Every participant completes a full, structured business plan draft paired with a cross-verified financial assumption workbook reviewed during the follow-up clinic.',
          },
        ],
      },
    },
    modal: {
      title: 'Request Program Discussion & Customization',
      subtitle: 'Complete the details below to prepare a briefing request or official quotation summary for your organization.',
      nameLabel: 'Officer / Coordinator Name',
      namePlaceholder: 'e.g. Sarah binti Ismail',
      orgLabel: 'Agency / Organization Name',
      orgPlaceholder: 'e.g. State Entrepreneurship Council',
      emailLabel: 'Official Email Address',
      emailPlaceholder: 'coordinator@agency.gov.my',
      modeLabel: 'Preferred Delivery Mode',
      modes: [
        { value: 'physical', label: 'In-Person Workshop' },
        { value: 'hybrid', label: 'Hybrid (In-Person + Online Follow-Up)' },
        { value: 'online', label: 'Fully Online Cohort' },
      ],
      notesLabel: 'Notes or Specific Requirements (Optional)',
      notesPlaceholder: 'Estimated cohort size, target dates, or agency-specific templates...',
      presetBannerLabel: 'Attached Estimate Summary',
      submitButton: 'Generate Request Summary',
      cancelButton: 'Cancel',
      errorRequired: 'Please enter the coordinator name, organization, and official email.',
      errorEmail: 'Please enter a valid email address format.',
      successTitle: 'Discussion Request Summary Ready',
      successBody:
        'Your program briefing details have been formatted below. You may print this view or include these details in your official correspondence.',
      successSummaryLabel: 'Prepared Summary',
      closeButton: 'Close',
    },
    footer: {
      title: 'Digital Proposal — AI-Assisted Business Plan Preparation Workshop',
      description: 'Bilingual interactive proposal engineered for desktop, mobile accessibility, and clean PDF printing.',
      copyright: '© 2026 All Rights Reserved.',
      backToTop: 'Back to Top',
    },
  },
};
