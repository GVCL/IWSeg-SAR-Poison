# IWSeg-SAR-Poison: Robust Inland Water Segmentation under Morphological Label Noise

This repository contains the code and dataset introduced in our paper, "Adversarial Robustness of Inland Water Body Segmentation Models to Morphological Label Noise in SAR Imagery".
We investigate how manual annotation errors—often present in ground truth water masks—affect the robustness of modern segmentation models. To this end, we simulate human annotation errors as adversarial (poisoning) attacks using controlled morphological operations.

---

## Overview

Accurate segmentation of inland water bodies from **Synthetic Aperture Radar (SAR)** images is crucial for applications such as **flood mapping, hydrological monitoring, and environmental assessment**.  
Although SAR sensors provide all-weather, high-resolution imagery, identifying water surfaces is challenging due to:

- Similar backscatter behavior between water and water-like surfaces (e.g., sand or sediments)  
- Complex river geometries in large basins such as the **Amazon River Basin**

To improve robustness, our work focuses on how **annotation noise**—commonly introduced during manual labeling—impacts deep-learning and transformer-based segmentation models.

---

## Key Contributions

- **Simulated Annotation Errors:** We introduce **morphological label noise** using erosion and dilation operations to mimic boundary mis-annotations typically caused by human error.  
- **Adversarial Training and Evaluation:** The corrupted ground-truth masks are treated as adversarial examples and used to train and evaluate multiple segmentation models.  
- **Model Robustness Comparison:** We assess how different architectures—including U-Net, DeepLabV3, SegFormer, and Mask2Former—respond to these morphological poisoning attacks.  
- **Public Dataset Release:** A curated dataset containing both clean and adversarially corrupted masks is provided for robustness benchmarking in water-body segmentation.

---

## Dataset Link

The full dataset (clean masks + morphological-corrupted masks) is publicly available [here](https://figshare.com/articles/dataset/Adversarial_Attack_Erosion_and_Dilation_Dataset_for_Amazon_River_Basin/28784405?file=53625587)

---

## Archival Submission Link

The previous archival version of the paper is publicly available [here](https://arxiv.org/abs/2505.01884)

---

## Method Summary

1. **Data Preparation:** Sentinel-1 SAR images are pre-processed and clipped to the region of interest. Ground-truth masks are generated using NDWI indices derived from Sentinel-2 imagery.  
2. **Adversarial Corruption:** Controlled morphological operations (erosion and dilation) are applied to simulate label noise that represents annotation inaccuracies.  
3. **Model Training and Evaluation:** Each segmentation model is trained and tested under different corruption levels. Metrics such as Dice Coefficient, IoU, Precision, Recall, F1-Score, and Pixel Accuracy are computed.  
4. **Qualitative Analysis:** Visual comparisons of predicted masks illustrate the resilience or degradation of different models under increasing annotation corruption.

---

## Highlights from the Study

- **U-Net** shows strong tolerance to mild corruption before a sharp drop in performance.  
- **SegFormer** and **DeepLabV3** exhibit gradual performance decline.  
- **Mask2Former** shows inconsistent behavior, likely due to dataset size constraints.  
- Certain anomalies in the dataset highlight the **U-Net’s** robustness to geometric inconsistencies.

---

