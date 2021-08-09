import checkNumInputs from './checkNumInputs';

const forms = (state) => {
   const form = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input');


   checkNumInputs('input[name="user_phone"]');



   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      failure: 'Что-то пошло не так...'
   }

   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;
      let res = await fetch(url, {
         method: 'POST',
         body: data
      });

      return await res.text();
   }

   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   }

   form.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();


         function closeModal() {
            if (item.parentElement.parentElement.parentElement.parentElement.className === 'popup_calc_end') {
               item.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
               document.body.style.overflow = '';
            }
         }


         setTimeout(() => {
            closeModal();
         }, 1000);


         function clearModalState() {
            for (let name in state) {
               delete state[name];
            }
         }

         setTimeout(() => {
            clearModalState();
         }, 1000);


         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage);

         const formData = new FormData(item);
         if (item.getAttribute('data-calc') === "end") {
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }

         postData('assets/server.php', formData)
            .then(res => {
               // console.log(res);
               statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
               }, 5000);
            });
      })
   })



};

export default forms;