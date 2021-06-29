import http from 'k6/http';
import { sleep } from 'k6';

let numberOfTests = 1;

export let options = {
  vus: 100,
  duration: '10s'
};

export default function () {
    http.get(`http://localhost:5000/products/999999/related`);
  sleep(1);
}