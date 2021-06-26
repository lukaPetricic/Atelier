import http from 'k6/http';
import { sleep } from 'k6';

let numberOfTests = 1;

export let options = {
  vus: 1000,
  duration: '5s'
};

export default function () {
  for (let id = 1000000 / 5 - numberOfTests; id < 1000000 / 5; id++) {
    http.get(`http://localhost:5000/products?page=${id}&count=5`);
  }
  sleep(1);
}