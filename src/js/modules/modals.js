const modals = () => {


   function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {


      const trigger = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector),
         close = document.querySelector(closeSelector),
         windows = document.querySelectorAll('[data-modal]'),
         scroll = calcScroll();

      let fieldAct = true;

      trigger.forEach(item => {
         item.addEventListener('click', (e) => {
            if (e.target) {
               e.preventDefault();
            }

            let itemForm = item.parentNode.querySelectorAll('input');


            for (let i = 0; i < itemForm.length; i++) {
               if (itemForm[i].type === 'text' && !itemForm[i].value) {
                  fieldAct = false;

                  break;
               } else if (itemForm[i].type === 'text' && itemForm[i].value) {
                  fieldAct = true;
               }

               if (itemForm[i].type === 'checkbox' && itemForm[i].checked) {
                  fieldAct = true;
                  break;
               } else if (itemForm[i].type === 'checkbox' && !itemForm[i].checked) {
                  fieldAct = false;
               }
            }

            if (fieldAct) {
               windows.forEach(item => {
                  item.style.display = 'none';
               });

               modal.style.display = 'block';
               document.body.style.overflow = 'hidden';
               // document.body.classList.add('modal-open');
            }

            document.body.style.marginRight = `${scroll}px`;
         });
      });


      close.addEventListener('click', () => {

         windows.forEach(item => {
            item.style.display = 'none';
         });

         modal.style.display = 'none';
         document.body.style.overflow = '';
         document.body.style.marginRight = `0px`;

         // document.body.classList.remove('modal-open');
      })


      modal.addEventListener('click', (e) => {

         if (e.target === modal && closeClickOverlay) {

            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;

            // document.body.classList.remove('modal-open');
         }
      })
   }

   function showModalByTyme(selector, time) {
      setTimeout(function () {
         document.querySelector(selector).style.display = 'block';
         document.body.style.overflow = '';
         document.body.style.marginRight = `0px`;

      }, time);

   }

   function calcScroll() {
      let div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.append(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
   }

   bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close ');
   bindModal('.phone_link', '.popup', '.popup .popup_close ');
   bindModal('.glazing_price_btn', '.popup_calc', '.popup_calc .popup_calc_close ');
   bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
   bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
   // showModalByTyme('.popup', 60000);
};

export default modals; ``