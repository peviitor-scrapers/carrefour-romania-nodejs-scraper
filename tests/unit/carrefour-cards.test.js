import { describe, it, expect, beforeAll } from '@jest/globals';

const HTML = `
<div class="row inner-row">
  <div class="col-xs-12 col-sm-12 col-md-6 opening">
    <a href="https://carrefour.ro/corporate/cariere/detalii/6873">
      <div class="box-style">
        <div class="carousel-title"><h2><b>Asistent Vanzari Electrocasnice</b></h2></div>
        <div class="location">Carrefour Timisoara</div>
        <div class="date-carousel after-close">Publicat la 08-10-2026</div>
      </div>
    </a>
  </div>
  <div class="col-xs-12 col-sm-12 col-md-6 opening">
    <a href="https://carrefour.ro/corporate/cariere/detalii/6871">
      <div class="box-style">
        <div class="carousel-title"><h2><b>Lucrator Universal Produse Proaspete Hiper</b></h2></div>
        <div class="location">Carrefour Brasov</div>
        <div class="date-carousel after-close">Publicat la 07-10-2026</div>
      </div>
    </a>
  </div>
</div>`;

describe('Carrefour card parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('extracts title, permalink and city; never sets a deadline from the publish date', () => {
    const items = index.parseCarrefourCards(HTML);
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      title: 'Asistent Vanzari Electrocasnice',
      url: 'https://carrefour.ro/corporate/cariere/detalii/6873',
      location: ['Timisoara']
    });
    expect(items[0].expirationdate).toBeUndefined();
    expect(items[1].location).toEqual(['Brasov']);
  });

  it('carrefourCity is null for an unknown store', () => {
    expect(index.carrefourCity('Carrefour Nicaieri')).toBeNull();
    expect(index.carrefourCity('Carrefour Bucuresti Orhideea')).toEqual(['Bucuresti']);
  });
});