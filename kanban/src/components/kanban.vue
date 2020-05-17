<template>
  <div class="kanban container">
    <h1 class="main__title" v-bind:class="{dark_main__title: isChecked}">{{ title }}</h1>
    <label for="theme" class="theme-label" v-bind:class="{dark_theme_label: isChecked}">
      Тёмная тема:
      <input type="checkbox" id="theme" @change="change_theme">
    </label>
    <div class="add_new_card">
      <textarea v-bind:class="{dark_input: isChecked}" placeholder="Описание" class="new_description"
                id="new_description"></textarea>
      <button v-bind:class="{dark_add_card: isChecked}" class="add-card" @click="add_card"></button>
    </div>
    <kanban-board v-bind:class="{dark_kanban: isChecked}" :stages="stages" :blocks="blocks" @update-block="updateBlock">
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2 class="column-title">
          {{ stage + ' (' + count[stage] + ')'}}
        </h2>
      </div>
      <div v-for="block in blocks" :slot="block.id" :key="block.id">
        <div class="task-number">
          <strong>Задача №</strong> {{ block.number }}
        </div>
        <div class="description">
          {{ block.description }}
        </div>
        <div v-if="(block.status=='В работе')" class="start_date">
          Дата начала:
          <br>
          {{ block.start_date | formatDate}}
        </div>
        <div v-if="(block.status=='Готово')" class="end_date">
          Дата начала:
          <br>
          <span>{{ block.start_date | formatDate}}</span>
          Времени потрачено:
          <br>
          {{ block.end_date - block.start_date | formatTime }}
        </div>
        <div class="name" v-if="(block.status=='В работе') || (block.status=='Готово')">
          <span>Имя ответственного:</span>
          <br>
          {{ block.name }}
        </div>
        <button class="btn close" @click="delete_card(block)"></button>
        <button class="btn edit" @click="show(block)"></button>
        <button class="btn confirm" @click="confirm(block, block.id)"></button>
      </div>
    </kanban-board>
    <modal name="card_edit" v-if="blocks[0]!=null">
      <button class="close-btn" @click="hide"></button>
      <div id="form" v-bind:class="{dark_form: isChecked}" class="form">
        <label for="input-status">
          Статус:
          <select v-bind:class="{dark_input_status: isChecked}" class="input input-status" v-model="status"
                  id="input-status">
            <option value="План">План</option>
            <option value="В работе">В работе</option>
            <option value="Готово">Готово</option>
          </select>
        </label>
        <label for="input-description">
          Описание:
          <textarea v-model="description" v-bind:class="{dark_new_description: isChecked}"
                    class="input input-description" id="input-description"></textarea>
        </label>
        <label v-if="(status=='В работе') || (status=='Готово')" for="input-name">
          Ответственный:
          <input v-model="name" v-bind:class="{dark_input: isChecked}" type="text" class="input input-name"
                 id="input-name">
        </label>
        <label for="input-start-date" v-if="(status=='В работе') || (status=='Готово')">
          Дата начала:
          <date-picker v-model="datetime_start" v-bind:class="{dark_mx_input: isChecked}" type="datetime"
                       id="input-start-date"></date-picker>
        </label>
        <label for="input-end-date" v-if="(status=='Готово')">
          Дата окончания:
          <date-picker v-model="datetime_end" v-bind:class="{dark_mx_input: isChecked}" type="datetime"
                       id="input-end-date"></date-picker>
        </label>
        <button class="apply" v-bind:class="{dark_input: isChecked}" @click="apply">Применить</button>
      </div>
    </modal>
  </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        name: 'kanban',
        components: {DatePicker},
        data() {
            return {
                // Переменные, массивы и обьекты, используемые в приложении
                title: 'Канбан',
                stages: ['План', 'В работе', 'Готово'],
                blocks: [],
                count: {'План': 0, 'В работе': 0, 'Готово': 0},
                datetime_start: new Date(),
                datetime_end: new Date(),
                description: '',
                name: '',
                status: 'План',
                block_id: 0,
                isChecked: false
            }
        },
        methods: {
            updateBlock(id, status) {
                this.blocks.find(b => b.id === Number(id)).status = status;
                if (status == 'В работе')
                    this.blocks.find(b => b.id === Number(id)).start_date = new Date();
                if (status == 'Готово')
                    this.blocks.find(b => b.id === Number(id)).end_date = new Date();

                // Пересчет количества карточек в колонках
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            delete_card(block) {
                block.status = 'deleted';

                // Пересчет количества карточек в колонках
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            confirm(block, id) {
                if (block.status == 'План') {
                    this.blocks.find(b => b.id === Number(id)).start_date = new Date();
                    block.status = 'В работе'
                } else if (block.status == 'В работе') {
                    this.blocks.find(b => b.id === Number(id)).end_date = new Date();
                    block.status = 'Готово'
                } else {
                    document.querySelector('.drag-item[data-block-id="' + block.id + '"] .confirm').classList.add("green_confirm")
                }

                // Пересчет количества карточек в колонках
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            add_card() {
                // Добавляет новую карточку путем добавления обьекта в массив
                this.blocks.push({
                    id: this.blocks.length + 1,
                    number: this.blocks.length + 1,
                    status: 'План',
                    description: document.querySelector('.new_description').value,
                    start_date: new Date(),
                    end_date: new Date(),
                    name: 'Alexey',
                });
                document.querySelector('.new_description').value = ''

                // Пересчет количества карточек в колонках
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            show(block) {
                // Показ модального окна
                this.$modal.show('card_edit');
                if (this.isChecked) {
                    console.log(document.querySelectorAll('.mx-input'))
                    for (var i = 0; i < document.querySelectorAll('.mx-input').length; ++i) {
                        document.querySelectorAll('.mx-input')[i].classList.add('dark_mx-input');
                    }
                }
                this.status = block.status
                this.block_id = block.id
                this.description = block.description
                this.name = block.name
                this.datetime_start = block.start_date
                this.datetime_end = block.end_date
            },
            hide() {
                // Закрытие модального окна без сохранения
                this.$modal.hide('card_edit');
            },
            apply() {
                // Закрытие модального окна и сохранение изменений, а так же валидация полей
                if (this.status == 'План') {
                    if (document.querySelector('.input-description').value != '') {
                        document.querySelector('.input-description').classList.remove("error")
                        this.$modal.hide('card_edit');
                        this.blocks[this.block_id - 1].description = this.description

                        this.blocks[this.block_id - 1].status = this.status
                    } else {
                        document.querySelector('.input-description').classList.add("error")
                    }
                } else if (this.status == 'В работе') {
                    if ((document.querySelector('.input-description').value != '') &&
                        (this.datetime_start != null) &&
                        (document.querySelector('.input-name').value != '')) {
                        this.$modal.hide('card_edit');
                        this.blocks[this.block_id - 1].description = this.description
                        this.blocks[this.block_id - 1].start_date = this.datetime_start
                        this.blocks[this.block_id - 1].name = this.name

                        this.blocks[this.block_id - 1].status = this.status
                    } else {
                        if (document.querySelector('.input-description').value == '') {
                            document.querySelector('.input-description').classList.add("error")
                        } else {
                            document.querySelector('.input-description').classList.remove("error")
                        }
                        if (this.datetime_start == null) {
                            document.querySelector('#input-start-date .mx-input').classList.add("error")
                        } else {
                            document.querySelector('#input-start-date .mx-input').classList.remove("error")
                        }
                        if (document.querySelector('.input-name').value == '') {
                            document.querySelector('.input-name').classList.add("error")
                        } else {
                            document.querySelector('.input-name').classList.remove("error")
                        }
                    }
                } else if (this.status == 'Готово') {
                    if ((document.querySelector('.input-description').value != '') &&
                        (this.datetime_start != null) &&
                        (this.datetime_end != null) &&
                        (document.querySelector('.input-name').value != '')) {
                        this.$modal.hide('card_edit');
                        this.blocks[this.block_id - 1].description = this.description
                        this.blocks[this.block_id - 1].start_date = this.datetime_start
                        this.blocks[this.block_id - 1].end_date = this.datetime_end
                        this.blocks[this.block_id - 1].name = this.name

                        this.blocks[this.block_id - 1].status = this.status
                    } else {
                        if (document.querySelector('.input-description').value == '') {
                            document.querySelector('.input-description').classList.add("error")
                        } else {
                            document.querySelector('.input-description').classList.remove("error")
                        }
                        if (this.datetime_start == null) {
                            document.querySelector('#input-start-date .mx-input').classList.add("error")
                        } else {
                            document.querySelector('#input-start-date .mx-input').classList.remove("error")
                        }
                        if (this.datetime_end == null) {
                            document.querySelector('#input-end-date .mx-input').classList.add("error")
                        } else {
                            document.querySelector('#input-end-date .mx-input').classList.remove("error")
                        }
                        if (document.querySelector('.input-name').value == '') {
                            document.querySelector('.input-name').classList.add("error")
                        } else {
                            document.querySelector('.input-name').classList.remove("error")
                        }
                    }
                }

                // Пересчет количества карточек в колонках
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            change_theme() {
                // смена темы
                this.isChecked = !this.isChecked
                if (this.isChecked) {
                    document.querySelector('body').classList.add('dark_body')
                } else {
                    document.querySelector('body').classList.remove('dark_body')

                }
            }
        }
    }
</script>
