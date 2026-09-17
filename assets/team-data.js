/*
 * Editable demo content. Keep sample/placeholder flags until facts are confirmed.
 * Only Zhaoxiang Liu, DistRMI, RSID, and the contact address come from the original
 * team.html. The 2 + 4 + 4 composition is an illustrative ten-person layout.
 * Photos are optional local paths, relative to index.html. Missing photos fall
 * back to initials without relying on an external placeholder service.
 */
window.TEAM_DATA = {
  members: [
    {
      id: "zhaoxiang-liu", name: "Zhaoxiang Liu", initials: "ZL", level: "phd",
      role: "Ph.D. Candidate", placeholder: false, photo: "",
      focus: "AI-driven drug discovery & research software",
      education: "Ph.D. Candidate in Electronic Information, Huazhong Agricultural University",
      responsibility: "AI modeling, research design, software development, and technical coordination",
      description: "Researcher working at the intersection of artificial intelligence, drug discovery, scientific computing, and software development.",
      tags: ["AI for Science", "Biological modeling", "AI agents", "Research software"]
    },
    {
      id: "doctoral-02", name: "Doctoral member 02", initials: "D2", level: "phd",
      role: "Doctoral researcher", placeholder: true, photo: "",
      focus: "Molecular modeling & experimental integration",
      tags: ["Molecular modeling", "Experimental integration"]
    },
    {
      id: "masters-01", name: "Master's member 01", initials: "M1", level: "masters",
      role: "Master's student", placeholder: true, photo: "",
      focus: "Machine learning & molecular representations",
      tags: ["Machine learning", "Molecular representations"]
    },
    {
      id: "masters-02", name: "Master's member 02", initials: "M2", level: "masters",
      role: "Master's student", placeholder: true, photo: "",
      focus: "AI agents & knowledge retrieval",
      tags: ["AI agents", "Knowledge retrieval"]
    },
    {
      id: "masters-03", name: "Master's member 03", initials: "M3", level: "masters",
      role: "Master's student", placeholder: true, photo: "",
      focus: "Multimodal learning & biological data",
      tags: ["Multimodal learning", "Biological data"]
    },
    {
      id: "masters-04", name: "Master's member 04", initials: "M4", level: "masters",
      role: "Master's student", placeholder: true, photo: "",
      focus: "Scientific computing & research platforms",
      tags: ["Scientific computing", "Research platforms"]
    },
    {
      id: "undergraduate-01", name: "Undergraduate 01", initials: "U1", level: "undergrad",
      role: "Undergraduate student", placeholder: true, photo: "",
      focus: "Web interfaces & data visualization",
      tags: ["Web development", "Data visualization"]
    },
    {
      id: "undergraduate-02", name: "Undergraduate 02", initials: "U2", level: "undergrad",
      role: "Undergraduate student", placeholder: true, photo: "",
      focus: "Data processing & scientific utilities",
      tags: ["Data processing", "Scientific utilities"]
    },
    {
      id: "undergraduate-03", name: "Undergraduate 03", initials: "U3", level: "undergrad",
      role: "Undergraduate student", placeholder: true, photo: "",
      focus: "Intelligent workflows & software tools",
      tags: ["Intelligent workflows", "Software tools"]
    },
    {
      id: "undergraduate-04", name: "Undergraduate 04", initials: "U4", level: "undergrad",
      role: "Undergraduate student", placeholder: true, photo: "",
      focus: "Biological data & research support",
      tags: ["Biological data", "Research support"]
    }
  ],
  outputs: [
    {
      id: "distrmi", type: "publication", sample: false,
      authors: ["Liu Z", "Zhu Q", "Tian Q", "Zhong L", "Deng Y", "Wei D", "Fu H"],
      year: 2025, venue: "Briefings in Bioinformatics", volume: "26", issue: "6", pages: "bbaf660",
      doi: "10.1093/bib/bbaf660",
      title: "DistRMI: a deep distance-aware neural network for explainable RNA loop motif-small molecule interaction prediction",
      description: "A deep learning framework integrating distance-aware interaction modeling to identify key binding regions for RNA–ligand interactions.",
      tags: ["RNA", "Drug discovery", "Explainable AI"],
      detail: "DistRMI uses distance-aware interaction modeling to study RNA loop motif–small molecule interactions. The framework focuses on explainable prediction and the identification of key binding regions.",
      sourceNote: "Authors, year, journal, volume, issue, article number, and DOI verified against Oxford Academic on 2026-09-17.",
      sourceUrl: "https://academic.oup.com/bib/article/26/6/bbaf660/8375362"
    },
    {
      id: "rsid", type: "platform", sample: false, venue: "Research database",
      title: "RSID: RNA–Small Molecule Interaction Database",
      description: "A web-based database with search and filtering tools for exploring RNA–small molecule interaction records.",
      tags: ["RNA", "Database", "Web platform"], url: "http://rsid.hzau.edu.cn/",
      detail: "RSID provides search and filtering functions to support efficient retrieval and screening of RNA–small molecule interaction records.",
      sourceNote: "Description and project address retained from the original team demo."
    },
    {
      id: "sample-molecular-learning", type: "publication", sample: true,
      title: "Learning molecular representations for interaction prediction",
      description: "Representation learning across molecular structures, binding patterns, and interaction features.",
      tags: ["Molecular modeling", "Representation learning", "Drug discovery"]
    },
    {
      id: "sample-research-agent", type: "software", sample: true,
      title: "Research Assistant: knowledge retrieval & intelligent workflows",
      description: "An illustrative research assistant connecting literature discovery, knowledge retrieval, and repeatable tasks.",
      tags: ["AI agents", "Knowledge retrieval", "Automation"]
    },
    {
      id: "sample-knowledge-platform", type: "platform", sample: true,
      title: "Scientific Knowledge Hub: connected research resources",
      description: "A platform concept for organizing scientific datasets, research notes, and reusable resources.",
      tags: ["Web development", "Research platform", "Knowledge management"]
    },
    {
      id: "sample-scientific-toolkit", type: "software", sample: true,
      title: "A practical toolkit for reproducible scientific computing",
      description: "Reusable utilities for data processing, experiment configuration, and scientific analysis.",
      tags: ["Scientific computing", "Reproducibility", "Software"]
    },
    {
      id: "sample-multimodal-biology", type: "publication", sample: true,
      title: "Connecting biological sequences and structures with multimodal AI",
      description: "An illustrative research topic exploring complementary signals in sequence and structural data.",
      tags: ["Multimodal AI", "Biological sequences", "Data intelligence"]
    },
    {
      id: "sample-computation-experiment", type: "publication", sample: true,
      title: "Bridging computational prediction and experimental validation",
      description: "A research theme connecting molecular modeling with the investigation of biological mechanisms.",
      tags: ["Molecular modeling", "Experimental validation", "Biological mechanisms"]
    },
    {
      id: "sample-screening-workbench", type: "platform", sample: true,
      title: "Molecular Screening Workbench: from data to candidate exploration",
      description: "An interface concept for exploring molecular candidates and comparing computational results.",
      tags: ["Virtual screening", "Web application", "Drug discovery"]
    },
    {
      id: "sample-data-curation", type: "software", sample: true,
      title: "Scientific Dataset Curator: structured, traceable data preparation",
      description: "A utility concept for cleaning, organizing, and documenting scientific data before analysis.",
      tags: ["Data processing", "Data quality", "Research software"]
    },
    {
      id: "sample-reading-group", type: "community", sample: true,
      title: "Reading Together: an interdisciplinary research exchange",
      description: "A sample space for sharing reading-group notes, paper discussions, and lessons across disciplines.",
      tags: ["Reading group", "Academic exchange", "Team learning"]
    },
    {
      id: "sample-student-showcase", type: "community", sample: true,
      title: "Student Research Showcase: ideas in progress",
      description: "A sample collection for student projects, short demonstrations, and shared research experiences.",
      tags: ["Student projects", "Demonstrations", "Collaboration"]
    }
  ]
};
