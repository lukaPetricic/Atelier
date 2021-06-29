import http from 'k6/http';
import { sleep } from 'k6';

let numberOfTests = 1;

export let options = {
  vus: 100,
  duration: '10s'
};

export default function () {
  for (let id = 1000000 - numberOfTests; id < 1000000; id++) {
    http.get(`http://localhost:5000/products/${id}`);
  }
  sleep(1);
}