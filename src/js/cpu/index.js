// !--------------------------------CPU--------------------------------

import { cpuDomIds } from './cpuDomIds';
import { CPU_DB } from './CPU_DB';
import { createButton } from '../createButton';
import { cpuDefaultData } from './cpuDefaultData';
import { inputData } from '../inputData';
import { refGeneration } from '../refGeneration';

export function runCpuScrypt() {
  // Створюємо шляхи до полів вводу
  const cpuRef = {};
  refGeneration(cpuDomIds, cpuRef);

  // Відмальовуємо кнопки
  const cpuButtonField = document.getElementById('id_cprop_6462');
  createButton(cpuButtonField, 'cpu');

  const cpuGraphicButtonField = document.getElementById('id_cprop_6473');
  createButton(cpuGraphicButtonField, 'cpu-gpu');

  // Логіка кліку на custom-cpu-button
  const cpuModelInput = document.getElementById('good_T2');
  const customCpuButton = document.querySelector('.custom-cpu-button');
  customCpuButton.addEventListener('click', onCpuButton);

  function onCpuButton() {
    const cpuModelData = CPU_DB.find(el => el.cpuModel.trim() === cpuModelInput.value.trim());

    if (!cpuModelData) {
      inputData(cpuRef, cpuDefaultData);
      return;
    }
    inputData(cpuRef, cpuModelData);

    cpuRef.series.style.color = 'red';
    cpuRef.codename.style.color = 'red';
    cpuRef.cores.style.color = 'red';
  }

  // Логіка кліку на custom-cpu-gpu-button
  const cpuGraphic = document.getElementById('good_T3');
  const cpuGraphicButton = document.querySelector('.custom-cpu-gpu-button');
  cpuGraphicButton.addEventListener('click', onCpuGraphicButton);

  function onCpuGraphicButton() {
    const cpuGraphicData = CPU_DB.find(el => el.cpuModel.trim() === cpuModelInput.value.trim());

    if (!cpuGraphicData) {
      cpuGraphic.value = '';
      return;
    }

    cpuGraphic.value = cpuGraphicData.gpuModel;
  }

  // Логіка кліку на Кастомні селекти
  const cpuSeriesSelect = document.querySelector('#select2-good_E6-container');
  const cpuCodenameSelect = document.querySelector('#select2-good_E40-container');
  const cpuThreadsSelect = document.querySelector('#select2-good_E5-container');

  cpuSeriesSelect.addEventListener('click', onCustomSelectClick);
  cpuCodenameSelect.addEventListener('click', onCustomSelectClick);
  cpuThreadsSelect.addEventListener('click', onCustomSelectClick);

  function onCustomSelectClick(e) {
    const selectSearchField = document.querySelector('.select2-search__field');

    if (!selectSearchField) {
      return;
    }

    selectSearchField.value = e.target.textContent;
  }
}
