/* global window */
import Mads, { fadeOutIn } from 'mads-custom';
import Velocity from 'velocity-animate';
import './main.css';

class AdUnit extends Mads {
  constructor() {
    super();

    window.leadGenCallback = this.callback.bind(this);
  }

  callback(resp) {
    if (resp.status) {
      fadeOutIn(this.elems.second, this.elems.third, {
        display: 'flex',
      });
      this.tracker('E', 'submitted');
    } else {
      throw new Error(resp.message);
    }
  }

  render() {
    return `
      <div class="container" id="ad-container">
        <div id="first" class="page">
          <img src="img/algotech3CTA-FORGET.png" id="forget" class="abs" />
          <img src="img/algotech1-WITHMORE.png" id="more" class="abs" />
          <img src="img/algotech1ATS-THELEAD.png" id="lead" class="abs" />
          <img src="img/algotech1NOFEES.png" id="fees" class="abs" />
          <img src="img/coin1.png" style="width:170px;" id="coin1" class="abs" />
          <img src="img/coin2.png" style="width:170px;" id="coin2" class="abs" />
          <img src="img/algotech2cursor.png" id="help" class="abs" />
        </div>
        <div id="second" class="page hide">
          <img src="img/algotech1coin-SIGNUP.png" id="sk" />
          <form id="form">
            <input name="name" placeholder="Name" id="inputName" type="text" required />
            <input name="phone" placeholder="Phone" id="inputPhone" type="number" required />
            <input name="email" placeholder="Email" id="inputEmail" type="email" required />
            <input type="image" src="img/algotech1SEND-BUTTON.png" id="inputSubmit" />
          </form>
        </div>
        <div id="third" class="page hide">
          <img src="img/algotech1THANKS.png" />
        </div>
      </div>
    `;
  }

  postRender() {
    Velocity(this.elems.help, { top: 345 }, { loop: true });
    this.elems.first.addEventListener('mousedown', () => {
      this.tracker('E', 'start_animation');
      Velocity(this.elems.help, { opacity: 0 }, { display: 'none',
        duration: 200,
        complete: () => {
          this.elems.help.remove();
        } });
      Velocity(this.elems.coin1,
        { top: 300, width: 300, left: -80 }, { duration: 500 });
      setTimeout(() => {
        Velocity(this.elems.coin2,
          { top: 300, width: 300 }, { duration: 500 });
      }, 300);

      // enter with more; leave forget
      setTimeout(() => {
        Velocity(this.elems.forget,
          { left: -225 }, { duration: 500 });
        Velocity(this.elems.more,
          { left: 40 }, { duration: 500 });
      }, 2000);

      setTimeout(() => {
        Velocity(this.elems.lead,
          { left: 30 }, { duration: 500 });
      }, 2500);

      setTimeout(() => {
        Velocity(this.elems.more,
          { left: -250 }, { duration: 500 });
      }, 6000);

      setTimeout(() => {
        Velocity(this.elems.lead,
          { top: 80 }, { duration: 500 });
      }, 6500);

      setTimeout(() => {
        Velocity(this.elems.fees,
          { left: 0 }, { duration: 500 });
      }, 7000);

      setTimeout(() => {
        Velocity(this.elems.lead,
          { left: -250 }, { duration: 500 });
      }, 12000);

      setTimeout(() => {
        Velocity(this.elems.fees,
          { top: 80 }, { duration: 500 });
      }, 12500);

      setTimeout(() => {
        fadeOutIn(this.elems.first, this.elems.second, {
          display: 'block',
        });
      }, 16000);
    });
  }

  style() {
    return [
      `
      #ad-container {
        background: url(img/algotech4bg.png)
      }
      #form.loading::after {
        background: rgba(255, 255, 255, 0.6);
        position: absolute;
        width: 100%;
        height: 100%;
        content: 'Please wait...';
        display: flex;
        justify-content: center;
        align-items: center;
      }
      `];
  }

  events() {
    this.elems.form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        this.elems.inputSubmit.setAttribute('disabled', 'disabled');
        this.elems.form.className = 'loading';
        // https://www.mobileads.com/api/save_lf?contactEmail=&gotDatas=1&element=[{%22fieldname%22:%22text_1%22,%22value%22:%22jeff%22,%22required%22:%22required%22},{%22fieldname%22:%22text_2%22,%22value%22:%22123%22,%22required%22:%22required%22},{%22fieldname%22:%22text_3%22,%22value%22:%22jeff@jeff.com%22,%22required%22:%22required%22}]&user-id=4055&studio-id=2&tab-id=1&trackid=2616&referredURL=Sample%20Ad%20Unit&callback=leadGenCallback&_=1515389790374
        this.loadJS(`https://www.mobileads.com/api/save_lf?contactEmail=&gotDatas=1&element=[{%22fieldname%22:%22text_1%22,%22value%22:%22${this.elems.inputName.value}%22,%22required%22:%22required%22},{%22fieldname%22:%22text_2%22,%22value%22:%22${this.elems.inputPhone.value}%22,%22required%22:%22required%22},{%22fieldname%22:%22text_3%22,%22value%22:%22${this.elems.inputEmail.value}%22,%22required%22:%22required%22}]&user-id=4055&studio-id=2&tab-id=1&trackid=2616&referredURL=${window.location.href}&callback=leadGenCallback&_=${+Date.now()}`) // eslint-disable-line
        this.tracker('E', 'submit');
      } catch (err) {
        this.elems.form.className = '';
        this.elems.inputSubmit.removeAttribute('disabled');
        console.log(err);
      }
    });
  }
}

window.ad = new AdUnit();
