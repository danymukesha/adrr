/**
 * Database for Alzheimer's Disease Research Resources
 * 
 * This file contains all the resource data for the website
 * Edit this file to add, update, or remove resources (Please contact me before editing: danymukesha@gmail.com)
 */

// Database structure: An object with categories as keys
// Each category has an array of resources
const resourceDatabase = {
    "databases": {
        "id": "databases",
        "name": "Databases & Data Repositories",
        "subcategories": {
            "alzheimers-specific": {
                "name": "Alzheimer's Disease Specific",
                "resources": [
                    {
                        "id": "adni",
                        "name": "Alzheimer's Disease Neuroimaging Initiative (ADNI)",
                        "url": "http://adni.loni.usc.edu/",
                        "description": "Longitudinal multicenter study designed to develop clinical, imaging, genetic, and biochemical biomarkers for the early detection and tracking of Alzheimer's disease."
                    },
                    {
                        "id": "adsp",
                        "name": "Alzheimer's Disease Sequencing Project (ADSP)",
                        "url": "https://www.niagads.org/adsp/",
                        "description": "Large-scale sequencing analysis of genomes of individuals with Alzheimer's disease."
                    },
                    {
                        "id": "alzgps",
                        "name": "AlzGPS",
                        "url": "https://alzgps.lerner.ccf.org/",
                        "description": "A genome-wide positioning systems platform for Alzheimer's disease drug discovery."
                    },
                    {
                        "id": "alzped",
                        "name": "AlzPED",
                        "url": "https://alzped.nia.nih.gov/",
                        "description": "Alzheimer's Preclinical Efficacy Database for evaluation of preclinical therapy development."
                    },
                    {
                        "id": "niagads",
                        "name": "NIAGADS",
                        "url": "https://www.niagads.org/",
                        "description": "NIA Genetics of Alzheimer's Disease Data Storage Site."
                    },
                    {
                        "id": "addi",
                        "name": "Alzheimer's Disease Data Initiative (ADDI)",
                        "url": "https://www.alzheimersdata.org/",
                        "description": "Global platform to accelerate discoveries and innovations in Alzheimer's disease and related dementias."
                    },
                    {
                        "id": "amp-ad",
                        "name": "AMP-AD Knowledge Portal",
                        "url": "https://adknowledgeportal.synapse.org/",
                        "description": "Data, tools, and resources for the study of Alzheimer's disease."
                    }
                ]
            },
            "general-neuroscience": {
                "name": "General Neuroscience",
                "resources": [
                    {
                        "id": "allen-brain",
                        "name": "Allen Brain Atlas",
                        "url": "https://portal.brain-map.org/",
                        "description": "Comprehensive atlas of gene expression in the adult and developing brain."
                    },
                    {
                        "id": "human-brain",
                        "name": "Human Brain Project",
                        "url": "https://www.humanbrainproject.eu/en/",
                        "description": "European research initiative aiming to build a collaborative ICT-based scientific research infrastructure."
                    },
                    {
                        "id": "brain-initiative",
                        "name": "BRAIN Initiative",
                        "url": "https://braininitiative.nih.gov/",
                        "description": "Revolutionary project aimed at developing innovative technologies to understand the human brain."
                    },
                    {
                        "id": "openneuro",
                        "name": "OpenNeuro",
                        "url": "https://openneuro.org/",
                        "description": "Free and open platform for sharing neuroimaging data."
                    }
                ]
            },
            "proteomics": {
                "name": "Proteomics & Metabolomics",
                "resources": [
                    {
                        "id": "proteomics-db",
                        "name": "Proteomics DB",
                        "url": "https://www.proteomicsdb.org/",
                        "description": "Database of human proteome information."
                    },
                    {
                        "id": "pride",
                        "name": "PRIDE Archive",
                        "url": "https://www.ebi.ac.uk/pride/archive/",
                        "description": "Repository of mass spectrometry proteomics data."
                    },
                    {
                        "id": "metabolomics",
                        "name": "Metabolomics Workbench",
                        "url": "https://www.metabolomicsworkbench.org/",
                        "description": "Repository for metabolomics data and metadata."
                    }
                ]
            }
        }
    },
    "organizations": {
        "id": "organizations",
        "name": "Research Organizations & Initiatives",
        "subcategories": {
            "government": {
                "name": "Government Organizations",
                "resources": [
                    {
                        "id": "nia",
                        "name": "National Institute on Aging (NIA)",
                        "url": "https://www.nia.nih.gov/health/alzheimers",
                        "description": "US federal agency supporting Alzheimer's research."
                    },
                    {
                        "id": "ninds",
                        "name": "National Institute of Neurological Disorders and Stroke (NINDS)",
                        "url": "https://www.ninds.nih.gov/",
                        "description": "US agency funding research on neurological disorders."
                    },
                    {
                        "id": "ema",
                        "name": "European Medicines Agency (EMA)",
                        "url": "https://www.ema.europa.eu/",
                        "description": "EU agency for the evaluation of medicinal products."
                    }
                ]
            },
            "nonprofit": {
                "name": "Non-Profit Organizations",
                "resources": [
                    {
                        "id": "alz-assoc",
                        "name": "Alzheimer's Association",
                        "url": "https://www.alz.org/research",
                        "description": "Largest nonprofit funder of Alzheimer's research."
                    },
                    {
                        "id": "alz-research-uk",
                        "name": "Alzheimer's Research UK",
                        "url": "https://www.alzheimersresearchuk.org/",
                        "description": "UK's leading dementia research charity."
                    },
                    {
                        "id": "alz-foundation",
                        "name": "Alzheimer's Foundation of America",
                        "url": "https://alzfdn.org/",
                        "description": "Organization providing support, services, and education."
                    },
                    {
                        "id": "cure-alz",
                        "name": "Cure Alzheimer's Fund",
                        "url": "https://curealz.org/",
                        "description": "Non-profit funding targeted research with potential for breakthrough results."
                    }
                ]
            },
            "international": {
                "name": "International Initiatives",
                "resources": [
                    {
                        "id": "who",
                        "name": "World Health Organization (WHO) Dementia Action Plan",
                        "url": "https://www.who.int/mental_health/neurology/dementia/action_plan_2017_2025/en/",
                        "description": "Global action plan on the public health response to dementia."
                    },
                    {
                        "id": "iadrp",
                        "name": "International Alzheimer's Disease Research Portfolio (IADRP)",
                        "url": "https://iadrp.nia.nih.gov/",
                        "description": "Database of funded Alzheimer's disease research projects."
                    },
                    {
                        "id": "jpnd",
                        "name": "JPND Research",
                        "url": "https://www.neurodegenerationresearch.eu/",
                        "description": "EU Joint Programme on Neurodegenerative Disease Research."
                    }
                ]
            }
        }
    },
    "genetic": {
        "id": "genetic",
        "name": "Genetic Resources",
        "subcategories": {
            "databases": {
                "name": "Databases & Repositories",
                "resources": [
                    {
                        "id": "alzgene",
                        "name": "AlzGene",
                        "url": "http://www.alzgene.org/",
                        "description": "Database of genetic association studies in Alzheimer's disease."
                    },
                    {
                        "id": "adgdb",
                        "name": "AD Genetics Database",
                        "url": "https://www.alzgene.org/",
                        "description": "Comprehensive, unbiased, publicly available database of genetic association studies."
                    },
                    {
                        "id": "gwas",
                        "name": "GWAS Catalog",
                        "url": "https://www.ebi.ac.uk/gwas/",
                        "description": "Catalog of genome-wide association studies."
                    },
                    {
                        "id": "gnomad",
                        "name": "gnomAD",
                        "url": "https://gnomad.broadinstitute.org/",
                        "description": "Genome Aggregation Database for population genetics."
                    }
                ]
            },
            "analysis-tools": {
                "name": "Analysis Tools",
                "resources": [
                    {
                        "id": "plink",
                        "name": "PLINK",
                        "url": "https://www.cog-genomics.org/plink/",
                        "description": "Whole genome association analysis toolset."
                    },
                    {
                        "id": "annovar",
                        "name": "ANNOVAR",
                        "url": "https://annovar.openbioinformatics.org/en/latest/",
                        "description": "Functional annotation of genetic variants."
                    },
                    {
                        "id": "polyphen",
                        "name": "PolyPhen-2",
                        "url": "http://genetics.bwh.harvard.edu/pph2/",
                        "description": "Tool for prediction of possible impact of amino acid substitutions."
                    }
                ]
            }
        }
    },
    "biomarker": {
        "id": "biomarker",
        "name": "Biomarker Research",
        "subcategories": {
            "blood": {
                "name": "Blood-Based Biomarkers",
                "resources": [
                    {
                        "id": "bbig",
                        "name": "Blood-Based Biomarker Interest Group",
                        "url": "https://alz.org/bbig/overview.asp",
                        "description": "Alzheimer's Association initiative for blood biomarkers."
                    },
                    {
                        "id": "fnih",
                        "name": "Foundation for the National Institutes of Health (FNIH) Biomarkers Consortium",
                        "url": "https://fnih.org/our-programs/biomarkers-consortium",
                        "description": "Public-private partnership for biomarker development."
                    }
                ]
            },
            "csf": {
                "name": "CSF Biomarkers",
                "resources": [
                    {
                        "id": "csf-qc",
                        "name": "Alzheimer's Association QC Program for CSF Biomarkers",
                        "url": "https://www.alzforum.org/news/research-news/worldwide-quality-control-set-csf-biomarker-measurements",
                        "description": "Quality control program for CSF biomarker measurements."
                    },
                    {
                        "id": "csf-db",
                        "name": "CSF Biomarker Database",
                        "url": "https://www.alzforum.org/alzbiomarker",
                        "description": "Database of published CSF biomarker performance."
                    }
                ]
            }
        }
    },
    "neuroimaging": {
        "id": "neuroimaging",
        "name": "Neuroimaging Resources",
        "subcategories": {
            "mri": {
                "name": "MRI Resources",
                "resources": [
                    {
                        "id": "adni-mri",
                        "name": "ADNI MRI Protocols",
                        "url": "http://adni.loni.usc.edu/methods/mri-tool/mri-analysis/",
                        "description": "Standardized MRI protocols for Alzheimer's disease research."
                    },
                    {
                        "id": "uk-biobank",
                        "name": "UK Biobank Imaging",
                        "url": "https://www.ukbiobank.ac.uk/enable-your-research/about-our-data/imaging-data",
                        "description": "Large-scale population imaging dataset."
                    },
                    {
                        "id": "connectome",
                        "name": "Human Connectome Project",
                        "url": "http://www.humanconnectomeproject.org/",
                        "description": "Mapping of human brain connectivity."
                    }
                ]
            },
            "pet": {
                "name": "PET Resources",
                "resources": [
                    {
                        "id": "centiloid",
                        "name": "Centiloid Project",
                        "url": "https://www.gaain.org/centiloid-project",
                        "description": "Standardization of amyloid PET measures."
                    },
                    {"id": "amypad",
                        "name": "AMYPAD",
                        "url": "https://amypad.eu/",
                        "description": "Amyloid imaging to prevent Alzheimer's disease."
                    },
                    {
                        "id": "adni-pet",
                        "name": "ADNI PET Protocols",
                        "url": "http://adni.loni.usc.edu/methods/pet-analysis/",
                        "description": "Standardized PET protocols for Alzheimer's research."
                    }
                ]
            },
            "multimodal": {
                "name": "Multimodal Imaging",
                "resources": [
                    {
                        "id": "brainimaging",
                        "name": "Brain Imaging Data Structure (BIDS)",
                        "url": "https://bids.neuroimaging.io/",
                        "description": "Standard for organizing and describing neuroimaging and behavioral data."
                    },
                    {
                        "id": "nift",
                        "name": "Neuroimaging Informatics Technology Initiative (NIfTI)",
                        "url": "https://nifti.nimh.nih.gov/",
                        "description": "Standard format for storing neuroimaging data."
                    }
                ]
            }
        }
    },
    "clinical-trials": {
        "id": "clinical-trials",
        "name": "Clinical Trials & Studies",
        "subcategories": {
            "registries": {
                "name": "Trial Registries",
                "resources": [
                    {
                        "id": "clinicaltrials",
                        "name": "ClinicalTrials.gov",
                        "url": "https://clinicaltrials.gov/",
                        "description": "Registry and results database of clinical studies."
                    },
                    {
                        "id": "euclinical",
                        "name": "EU Clinical Trials Register",
                        "url": "https://www.clinicaltrialsregister.eu/",
                        "description": "European database of clinical trials."
                    },
                    {
                        "id": "isrctn",
                        "name": "ISRCTN Registry",
                        "url": "https://www.isrctn.com/",
                        "description": "Primary clinical trial registry."
                    }
                ]
            },
            "trial-networks": {
                "name": "Trial Networks",
                "resources": [
                    {
                        "id": "adcs",
                        "name": "Alzheimer's Disease Cooperative Study (ADCS)",
                        "url": "https://www.adcs.org/",
                        "description": "Academic consortium conducting clinical trials on Alzheimer's disease."
                    },
                    {
                        "id": "actc",
                        "name": "Alzheimer's Clinical Trials Consortium (ACTC)",
                        "url": "https://www.actcinfo.org/",
                        "description": "Network of clinical trial sites for Alzheimer's disease research."
                    },
                    {
                        "id": "dian",
                        "name": "Dominantly Inherited Alzheimer Network (DIAN)",
                        "url": "https://dian.wustl.edu/",
                        "description": "International research partnership studying dominantly inherited Alzheimer's disease."
                    }
                ]
            }
        }
    },
    "models": {
        "id": "models",
        "name": "Models & Model Systems",
        "subcategories": {
            "animal": {
                "name": "Animal Models",
                "resources": [
                    {
                        "id": "jax",
                        "name": "JAX Alzheimer's Disease Mouse Models",
                        "url": "https://www.jax.org/research-and-faculty/research-centers/alzheimers-disease-center",
                        "description": "Repository of Alzheimer's disease mouse models."
                    },
                    {
                        "id": "modelad",
                        "name": "MODEL-AD",
                        "url": "https://model-ad.org/",
                        "description": "Model Organism Development & Evaluation for Late-Onset Alzheimer's Disease."
                    },
                    {
                        "id": "alzforum-models",
                        "name": "Alzforum Research Models",
                        "url": "https://www.alzforum.org/research-models",
                        "description": "Database of Alzheimer's disease research models."
                    }
                ]
            },
            "cellular": {
                "name": "Cellular Models",
                "resources": [
                    {
                        "id": "ipsc",
                        "name": "iPSC Neurodegenerative Disease Initiative (iNDI)",
                        "url": "https://www.nia.nih.gov/research/amp-ad/indi",
                        "description": "Collection of iPSC lines from patients with neurodegenerative diseases."
                    },
                    {
                        "id": "nyscf",
                        "name": "NYSCF Stem Cell Repository",
                        "url": "https://nyscf.org/research-institute/stem-cell-repository/",
                        "description": "Repository of stem cell lines for disease research."
                    }
                ]
            },
            "computational": {
                "name": "Computational Models",
                "resources": [
                    {
                        "id": "mimic",
                        "name": "MIMIC-AD",
                        "url": "https://www.mimic-ad.org/",
                        "description": "Molecular Integration of Mechanisms In Alzheimer's Disease."
                    },
                    {
                        "id": "admodel",
                        "name": "Alzheimer's Disease Model Explorer",
                        "url": "https://alzheimers.ebi.ac.uk/",
                        "description": "Platform for computational models of Alzheimer's disease mechanisms."
                    }
                ]
            }
        }
    },
    "tools": {
        "id": "tools",
        "name": "Research Tools & Methods",
        "subcategories": {
            "cognitive": {
                "name": "Cognitive Assessment Tools",
                "resources": [
                    {
                        "id": "nihtoolbox",
                        "name": "NIH Toolbox",
                        "url": "https://www.healthmeasures.net/explore-measurement-systems/nih-toolbox",
                        "description": "Set of measures for assessment of neurological and behavioral function."
                    },
                    {
                        "id": "promis",
                        "name": "PROMIS",
                        "url": "https://www.healthmeasures.net/explore-measurement-systems/promis",
                        "description": "Patient-Reported Outcomes Measurement Information System."
                    }
                ]
            },
            "bioinformatics": {
                "name": "Bioinformatics Tools",
                "resources": [
                    {
                        "id": "rnaseq",
                        "name": "RNA-Seq Tools for AD",
                        "url": "https://www.synapse.org/#!Synapse:syn2580853/wiki/409844",
                        "description": "Collection of tools for RNA sequencing analysis in Alzheimer's research."
                    },
                    {
                        "id": "enrichr",
                        "name": "Enrichr",
                        "url": "https://maayanlab.cloud/Enrichr/",
                        "description": "Gene set enrichment analysis tool."
                    },
                    {
                        "id": "string",
                        "name": "STRING",
                        "url": "https://string-db.org/",
                        "description": "Protein-protein interaction networks database."
                    }
                ]
            }
        }
    },
    "education": {
        "id": "education",
        "name": "Educational Resources",
        "subcategories": {
            "courses": {
                "name": "Courses & Training",
                "resources": [
                    {
                        "id": "nia-training",
                        "name": "NIA Training Programs",
                        "url": "https://www.nia.nih.gov/research/training",
                        "description": "Training opportunities in aging and Alzheimer's research."
                    },
                    {
                        "id": "alzforum-webinars",
                        "name": "Alzforum Webinars",
                        "url": "https://www.alzforum.org/webinars",
                        "description": "Educational webinars on Alzheimer's research topics."
                    },
                    {
                        "id": "coursera-neurosci",
                        "name": "Coursera Neuroscience Courses",
                        "url": "https://www.coursera.org/courses?query=neuroscience",
                        "description": "Online courses on neuroscience topics."
                    }
                ]
            },
            "references": {
                "name": "Reference Materials",
                "resources": [
                    {
                        "id": "alz-encyclopedia",
                        "name": "Alzheimer's Disease Encyclopedia",
                        "url": "https://www.alzforum.org/alzpedia",
                        "description": "Encyclopedia of Alzheimer's disease terms and concepts."
                    },
                    {
                        "id": "alzpathology",
                        "name": "Digital Alzheimer's Pathology Resource",
                        "url": "https://alzpath.org/",
                        "description": "Digital resource for Alzheimer's disease pathology."
                    }
                ]
            }
        }
    }
};

export default resourceDatabase;
