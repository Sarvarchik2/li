<template>
  <div class="contact">
    <div class="main-content-contact">
      <h3>Контакты</h3>
      <div class="main-content-contact-wrapper">
        <div class="main-content-contact-left">
          <h4>Филлиалы</h4>
          <button>Ташкент</button>
          <h4>Адрес</h4>
          <p>Мирабадский район, улица Тараса Шевченко 25А, Lixiang Auto part</p>
          <div class="main-content-contact-left-info">
            <div class="main-content-contact-left-info-item">
              <h4>Контактный телефон</h4>
              <NuxtLink>+998 90 999 99 99</NuxtLink>
              <NuxtLink>+998 90 999 99 99</NuxtLink>
            </div>
            <div class="main-content-contact-left-info-item">
              <h4>Время работы</h4>
              <NuxtLink>ПН-ПТ 24/7</NuxtLink>
              <NuxtLink>СБ-ВС 8:00 - 20:00</NuxtLink>
            </div>
          </div>
        </div>
        <div class="main-content-contact-right">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.5064760221544!2d69.29120127661356!3d41.297844301543655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5a801ddb953%3A0x4a98d90dabc4969d!2syas%20auto!5e0!3m2!1sru!2s!4v1746028803104!5m2!1sru!2s" width="100%" height="100%" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
      <form class="contact-content">
        <div class="contact-content-left">
          <input placeholder="Имя*" type="text"/>
          <input placeholder="Фамилия*" type="text"/>
          <input placeholder="Номер телефона" type="number"/>

        </div>

        <textarea class="contact-content-right" placeholder="Коментарий"></textarea>
        <button>Отправить заявку</button>
      </form>

    </div>

  </div>
</template>

<style>
@import "./contact.css";
.contact {
  width: 100%;
}
.contact .main-content-contact{
  margin-top: 20px;
}
</style>
<script setup lang="ts">
</script>