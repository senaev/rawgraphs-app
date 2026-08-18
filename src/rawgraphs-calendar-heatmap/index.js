/*
  Vendored from @rawgraphs/rawgraphs-calendar-heatmap@1.0.0-beta.8 (Apache-2.0), file lib/index.es.js.
  The prebuilt bundle is vendored, not the upstream source: that source needs a
  custom .css.raw loader and SVG pipeline that CRA cannot run.

  Local changes:
   - '@rawgraphs/rawgraphs-core' -> '../rawgraphs-core'
   - lint/correctness fixes marked in the commit message
*/
import * as d3 from 'd3';
import { rollups, timeDay, selection, transition, select, groups, timeYear, max, timeWeek, scaleBand, timeFormat, utcMonths, timeMonth, utcYear } from 'd3';
import { getDimensionAggregator, legend } from '../rawgraphs-core';

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2306c26c%3b %7d .cls-2 %7b fill: %2395e5c0%3b %7d %3c/style%3e %3c/defs%3e %3crect class='cls-1' x='14' y='20' width='5' height='5'/%3e %3crect class='cls-1' x='14' y='26' width='5' height='5'/%3e %3crect class='cls-2' x='14' y='32' width='5' height='5'/%3e %3crect class='cls-2' x='14' y='38' width='5' height='5'/%3e %3crect class='cls-1' x='14' y='44' width='5' height='5'/%3e %3crect class='cls-2' x='20' y='8' width='5' height='5'/%3e %3crect class='cls-2' x='20' y='14' width='5' height='5'/%3e %3crect class='cls-2' x='20' y='20' width='5' height='5'/%3e %3crect class='cls-1' x='20' y='26' width='5' height='5'/%3e %3crect class='cls-1' x='20' y='32' width='5' height='5'/%3e %3crect class='cls-1' x='20' y='38' width='5' height='5'/%3e %3crect class='cls-2' x='20' y='44' width='5' height='5'/%3e %3crect class='cls-2' x='26' y='8' width='5' height='5'/%3e %3crect class='cls-2' x='26' y='14' width='5' height='5'/%3e %3crect class='cls-1' x='26' y='20' width='5' height='5'/%3e %3crect class='cls-2' x='26' y='26' width='5' height='5'/%3e %3crect class='cls-1' x='26' y='32' width='5' height='5'/%3e %3crect class='cls-1' x='26' y='38' width='5' height='5'/%3e %3crect class='cls-1' x='26' y='44' width='5' height='5'/%3e %3crect class='cls-2' x='32' y='8' width='5' height='5'/%3e %3crect class='cls-2' x='32' y='14' width='5' height='5'/%3e %3crect class='cls-1' x='32' y='20' width='5' height='5'/%3e %3crect class='cls-1' x='32' y='26' width='5' height='5'/%3e %3crect class='cls-1' x='32' y='32' width='5' height='5'/%3e %3crect class='cls-1' x='32' y='38' width='5' height='5'/%3e %3crect class='cls-1' x='32' y='44' width='5' height='5'/%3e %3crect class='cls-2' x='38' y='8' width='5' height='5'/%3e %3crect class='cls-1' x='38' y='14' width='5' height='5'/%3e %3crect class='cls-2' x='38' y='20' width='5' height='5'/%3e %3crect class='cls-2' x='38' y='26' width='5' height='5'/%3e %3crect class='cls-2' x='38' y='32' width='5' height='5'/%3e %3cpolygon class='cls-1' points='17 8 17 17 11 17 11 18 11 49 12 49 12 18 17 18 18 18 18 17 18 8 17 8'/%3e %3cpolygon class='cls-1' points='45 8 45 39 39 39 39 40 39 49 40 49 40 40 45 40 46 40 46 8 45 8'/%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 25.1.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 320 160' style='enable-background:new 0 0 320 160%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bfill:white%3b%7d .st1%7bfill:%23FFF1EA%3b%7d .st2%7bfill:%23FEE9DF%3b%7d .st3%7bfill:%23FEDCCC%3b%7d .st4%7bfill:%23FDC4AE%3b%7d .st5%7bfill:%23FCA487%3b%7d .st6%7bfill:%23F4533C%3b%7d .st7%7bfill:%2367000D%3b%7d .st8%7bfill:%23FDCCB8%3b%7d .st9%7bfill:%23FFEEE6%3b%7d .st10%7bfill:%23FEE3D7%3b%7d .st11%7bfill:%23FDD5C4%3b%7d .st12%7bfill:%23FCBFA8%3b%7d .st13%7bfill:%23FEEBE1%3b%7d .st14%7bfill:%23FEE7DC%3b%7d .st15%7bfill:%23FED7C6%3b%7d .st16%7bfill:%23FC9F81%3b%7d .st17%7bfill:%23FCAF93%3b%7d .st18%7bfill:%23FEEAE1%3b%7d .st19%7bfill:%23FDCDB9%3b%7d .st20%7bfill:%23FCA78B%3b%7d .st21%7bfill:%23FC8E6E%3b%7d .st22%7bfill:%23FCA88C%3b%7d .st23%7bfill:%23FB8060%3b%7d .st24%7bfill:%23FCAB8F%3b%7d .st25%7bfill:%23FC9678%3b%7d .st26%7bfill:%23FA7354%3b%7d .st27%7bfill:%23FDC0A9%3b%7d .st28%7bfill:%23FEDACA%3b%7d .st29%7bfill:%23FC8768%3b%7d .st30%7bfill:%23FDC6B0%3b%7d .st31%7bfill:%23FDC9B4%3b%7d .st32%7bfill:%23FEDDCE%3b%7d .st33%7bfill:%23FDD3C1%3b%7d .st34%7bfill:%23FDC8B2%3b%7d .st35%7bfill:%23FCBCA3%3b%7d .st36%7bfill:%23FC9273%3b%7d .st37%7bfill:%23FCB196%3b%7d .st38%7bfill:%23F6583F%3b%7d .st39%7bfill:%23FDD4C2%3b%7d .st40%7bfill:%23FFEEE5%3b%7d .st41%7bfill:%23FEE3D6%3b%7d .st42%7bfill:%23FCB69C%3b%7d .st43%7bfill:%23F24C37%3b%7d .st44%7bfill:%23F04734%3b%7d .st45%7bfill:%23FCAC90%3b%7d .st46%7bfill:%23FEE0D3%3b%7d .st47%7bfill:%23FB7556%3b%7d .st48%7bfill:%23F04634%3b%7d .st49%7bfill:%23F75D43%3b%7d .st50%7bfill:%23FCB99F%3b%7d .st51%7bfill:%23FEE4D8%3b%7d .st52%7bfill:%23FCB9A0%3b%7d .st53%7bfill:%23FCB094%3b%7d .st54%7bfill:%23FCB298%3b%7d .st55%7bfill:%23FCAD91%3b%7d .st56%7bfill:%23FDCFBB%3b%7d .st57%7bfill:%23FDD1BE%3b%7d .st58%7bfill:%23FEDFD1%3b%7d .st59%7bfill:%23FDC4AD%3b%7d .st60%7bfill:%23FCBBA3%3b%7d .st61%7bfill:%23FEE4D7%3b%7d .st62%7bfill:%23FFECE4%3b%7d .st63%7bfill:%23FFEFE8%3b%7d .st64%7bfill:%23FEE7DD%3b%7d .st65%7bfill:%23FFECE3%3b%7d .st66%7bfill:%23FEE5D9%3b%7d .st67%7bfill:%23FEE0D2%3b%7d .st68%7bfill:%23FFEDE5%3b%7d .st69%7bfill:%23FEDCCD%3b%7d .st70%7bfill:%23FDC3AC%3b%7d .st71%7bfill:%23FCC0A8%3b%7d .st72%7bfill:%23FFEDE4%3b%7d .st73%7bfill:%23FEE9DE%3b%7d .st74%7bfill:%23FEDACB%3b%7d .st75%7bfill:%23FDC1A9%3b%7d .st76%7bfill:%23FCB79D%3b%7d .st77%7bfill:%23FCB69D%3b%7d .st78%7bfill:%23FEDBCC%3b%7d .st79%7bfill:%23FEE6DB%3b%7d .st80%7bfill:%23FFEBE2%3b%7d .st81%7bfill:%23FEDBCB%3b%7d .st82%7bfill:%23FEE2D5%3b%7d .st83%7bfill:%23FED8C8%3b%7d .st84%7bfill:%23FFEBE1%3b%7d .st85%7bfont-family:'Helvetica-Bold'%3b%7d .st86%7bfont-size:10px%3b%7d .st87%7bfont-family:'Helvetica'%3b%7d .st88%7bfill:none%3bstroke:%23CCCCCC%3b%7d%3c/style%3e%3crect id='backgorund' y='0' class='st0' width='320' height='160'/%3e%3crect x='34.8' y='61.8' class='st1' width='16.6' height='16.6'/%3e%3crect x='34.8' y='81.7' class='st2' width='16.6' height='16.6'/%3e%3crect x='34.8' y='101.5' class='st3' width='16.6' height='16.6'/%3e%3crect x='34.8' y='121.4' class='st4' width='16.6' height='16.6'/%3e%3crect x='34.8' y='141.2' class='st5' width='16.6' height='16.6'/%3e%3crect x='54.7' y='22.1' class='st6' width='16.6' height='16.6'/%3e%3crect x='54.7' y='41.9' class='st7' width='16.6' height='16.6'/%3e%3crect x='54.7' y='61.8' class='st8' width='16.6' height='16.6'/%3e%3crect x='54.7' y='81.7' class='st9' width='16.6' height='16.6'/%3e%3crect x='54.7' y='101.5' class='st10' width='16.6' height='16.6'/%3e%3crect x='54.7' y='121.4' class='st11' width='16.6' height='16.6'/%3e%3crect x='54.7' y='141.2' class='st12' width='16.6' height='16.6'/%3e%3crect x='74.5' y='22.1' class='st13' width='16.6' height='16.6'/%3e%3crect x='74.5' y='41.9' class='st14' width='16.6' height='16.6'/%3e%3crect x='74.5' y='61.8' class='st15' width='16.6' height='16.6'/%3e%3crect x='74.5' y='81.7' class='st16' width='16.6' height='16.6'/%3e%3crect x='74.5' y='101.5' class='st17' width='16.6' height='16.6'/%3e%3crect x='74.5' y='121.4' class='st18' width='16.6' height='16.6'/%3e%3crect x='74.5' y='141.2' class='st19' width='16.6' height='16.6'/%3e%3crect x='94.4' y='22.1' class='st20' width='16.6' height='16.6'/%3e%3crect x='94.4' y='41.9' class='st21' width='16.6' height='16.6'/%3e%3crect x='94.4' y='61.8' class='st22' width='16.6' height='16.6'/%3e%3crect x='94.4' y='81.7' class='st23' width='16.6' height='16.6'/%3e%3crect x='94.4' y='101.5' class='st24' width='16.6' height='16.6'/%3e%3crect x='94.4' y='121.4' class='st25' width='16.6' height='16.6'/%3e%3crect x='94.4' y='141.2' class='st26' width='16.6' height='16.6'/%3e%3crect x='114.3' y='22.1' class='st22' width='16.6' height='16.6'/%3e%3crect x='114.3' y='41.9' class='st27' width='16.6' height='16.6'/%3e%3crect x='114.3' y='61.8' class='st28' width='16.6' height='16.6'/%3e%3crect x='114.3' y='81.7' class='st29' width='16.6' height='16.6'/%3e%3crect x='114.3' y='101.5' class='st19' width='16.6' height='16.6'/%3e%3crect x='114.3' y='121.4' class='st30' width='16.6' height='16.6'/%3e%3crect x='114.3' y='141.2' class='st31' width='16.6' height='16.6'/%3e%3crect x='134.1' y='22.1' class='st32' width='16.6' height='16.6'/%3e%3crect x='134.1' y='41.9' class='st33' width='16.6' height='16.6'/%3e%3crect x='134.1' y='61.8' class='st34' width='16.6' height='16.6'/%3e%3crect x='134.1' y='81.7' class='st35' width='16.6' height='16.6'/%3e%3crect x='134.1' y='101.5' class='st36' width='16.6' height='16.6'/%3e%3crect x='134.1' y='121.4' class='st37' width='16.6' height='16.6'/%3e%3crect x='134.1' y='141.2' class='st38' width='16.6' height='16.6'/%3e%3crect x='154' y='22.1' class='st39' width='16.6' height='16.6'/%3e%3crect x='154' y='41.9' class='st40' width='16.6' height='16.6'/%3e%3crect x='154' y='61.8' class='st41' width='16.6' height='16.6'/%3e%3crect x='154' y='81.7' class='st42' width='16.6' height='16.6'/%3e%3crect x='154' y='101.5' class='st36' width='16.6' height='16.6'/%3e%3crect x='154' y='121.4' class='st43' width='16.6' height='16.6'/%3e%3crect x='154' y='141.2' class='st44' width='16.6' height='16.6'/%3e%3crect x='173.8' y='22.1' class='st45' width='16.6' height='16.6'/%3e%3crect x='173.8' y='41.9' class='st46' width='16.6' height='16.6'/%3e%3crect x='173.8' y='61.8' class='st47' width='16.6' height='16.6'/%3e%3crect x='173.8' y='81.7' class='st48' width='16.6' height='16.6'/%3e%3crect x='173.8' y='101.5' class='st49' width='16.6' height='16.6'/%3e%3crect x='173.8' y='121.4' class='st50' width='16.6' height='16.6'/%3e%3crect x='173.8' y='141.2' class='st51' width='16.6' height='16.6'/%3e%3crect x='193.7' y='22.1' class='st52' width='16.6' height='16.6'/%3e%3crect x='193.7' y='41.9' class='st53' width='16.6' height='16.6'/%3e%3crect x='193.7' y='61.8' class='st54' width='16.6' height='16.6'/%3e%3crect x='193.7' y='81.7' class='st42' width='16.6' height='16.6'/%3e%3crect x='193.7' y='101.5' class='st55' width='16.6' height='16.6'/%3e%3crect x='193.7' y='121.4' class='st31' width='16.6' height='16.6'/%3e%3crect x='193.7' y='141.2' class='st56' width='16.6' height='16.6'/%3e%3crect x='213.6' y='22.1' class='st57' width='16.6' height='16.6'/%3e%3crect x='213.6' y='41.9' class='st58' width='16.6' height='16.6'/%3e%3crect x='213.6' y='61.8' class='st59' width='16.6' height='16.6'/%3e%3crect x='213.6' y='81.7' class='st60' width='16.6' height='16.6'/%3e%3crect x='213.6' y='101.5' class='st39' width='16.6' height='16.6'/%3e%3crect x='213.6' y='121.4' class='st41' width='16.6' height='16.6'/%3e%3crect x='213.6' y='141.2' class='st61' width='16.6' height='16.6'/%3e%3crect x='233.4' y='22.1' class='st62' width='16.6' height='16.6'/%3e%3crect x='233.4' y='41.9' class='st63' width='16.6' height='16.6'/%3e%3crect x='233.4' y='61.8' class='st2' width='16.6' height='16.6'/%3e%3crect x='233.4' y='81.7' class='st64' width='16.6' height='16.6'/%3e%3crect x='233.4' y='101.5' class='st65' width='16.6' height='16.6'/%3e%3crect x='233.4' y='121.4' class='st66' width='16.6' height='16.6'/%3e%3crect x='233.4' y='141.2' class='st67' width='16.6' height='16.6'/%3e%3crect x='253.3' y='22.1' class='st1' width='16.6' height='16.6'/%3e%3crect x='253.3' y='41.9' class='st68' width='16.6' height='16.6'/%3e%3crect x='253.3' y='61.8' class='st2' width='16.6' height='16.6'/%3e%3crect x='253.3' y='81.7' class='st69' width='16.6' height='16.6'/%3e%3crect x='253.3' y='101.5' class='st70' width='16.6' height='16.6'/%3e%3crect x='253.3' y='121.4' class='st42' width='16.6' height='16.6'/%3e%3crect x='253.3' y='141.2' class='st71' width='16.6' height='16.6'/%3e%3crect x='273.1' y='22.1' class='st46' width='16.6' height='16.6'/%3e%3crect x='273.1' y='41.9' class='st72' width='16.6' height='16.6'/%3e%3crect x='273.1' y='61.8' class='st73' width='16.6' height='16.6'/%3e%3crect x='273.1' y='81.7' class='st51' width='16.6' height='16.6'/%3e%3crect x='273.1' y='101.5' class='st74' width='16.6' height='16.6'/%3e%3crect x='273.1' y='121.4' class='st75' width='16.6' height='16.6'/%3e%3crect x='273.1' y='141.2' class='st76' width='16.6' height='16.6'/%3e%3crect x='293' y='22.1' class='st77' width='16.6' height='16.6'/%3e%3crect x='293' y='41.9' class='st30' width='16.6' height='16.6'/%3e%3crect x='293' y='61.8' class='st78' width='16.6' height='16.6'/%3e%3crect x='293' y='81.7' class='st79' width='16.6' height='16.6'/%3e%3crect x='293' y='101.5' class='st80' width='16.6' height='16.6'/%3e%3crect x='293' y='121.4' class='st81' width='16.6' height='16.6'/%3e%3crect x='293' y='141.2' class='st58' width='16.6' height='16.6'/%3e%3crect x='312.8' y='22.1' class='st66' width='16.6' height='16.6'/%3e%3crect x='312.8' y='41.9' class='st18' width='16.6' height='16.6'/%3e%3crect x='312.8' y='61.8' class='st82' width='16.6' height='16.6'/%3e%3crect x='312.8' y='81.7' class='st78' width='16.6' height='16.6'/%3e%3crect x='312.8' y='101.5' class='st46' width='16.6' height='16.6'/%3e%3crect x='312.8' y='121.4' class='st83' width='16.6' height='16.6'/%3e%3crect x='312.8' y='141.2' class='st84' width='16.6' height='16.6'/%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 2.8648 10.7949)' class='st85 st86'%3e2019%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 5.6577 30.4033)' class='st87 st86'%3eMon%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 7.8794 50.2617)' class='st87 st86'%3eTue%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 4.5493 70.1182)' class='st87 st86'%3eWed%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 7.8794 89.9771)' class='st87 st86'%3eThu%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 13.4507 109.8325)' class='st87 st86'%3eFri%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 10.1011 129.6919)' class='st87 st86'%3eSat%3c/text%3e%3c/g%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 7.3179 149.5474)' class='st87 st86'%3eSun%3c/text%3e%3c/g%3e%3cpath class='st88' d='M53.1%2c20.5v19.9H33.2v119.1'/%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 59.5316 10.7949)' class='st87 st86'%3eJan%3c/text%3e%3c/g%3e%3cpath class='st88' d='M132.5%2c20.5v79.4h-19.9v59.6'/%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 138.9623 10.7949)' class='st87 st86'%3eFeb%3c/text%3e%3c/g%3e%3cpath class='st88' d='M211.9%2c20.5v79.4h-19.9v59.6'/%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 218.3929 10.7949)' class='st87 st86'%3eMar%3c/text%3e%3c/g%3e%3cpath class='st88' d='M291.4%2c20.5v139'/%3e%3cg%3e %3ctext transform='matrix(1 0 0 1 296.4304 10.7949)' class='st87 st86'%3eApr%3c/text%3e%3c/g%3e%3c/svg%3e";

const metadata = {
  name: 'Calendar heatmap',
  id: 'rawgraphs.calendarheatmap',
  thumbnail: img,
  icon: img$1,
  categories: ['time chunks', 'proportions'],
  description: 'It visualise data through variations in colouring of a grid. The grid is composed by squares which represent a day in a calendar layout.',
  code: 'https://github.com/rawgraphs/rawgraphs-calendar-heatmap',
  tutorial: 'https://www.rawgraphs.io/learning/how-to-make-a-calendar-heatmap'
};

const dimensions = [{
  id: 'date',
  name: 'Date',
  validTypes: ['date'],
  required: true
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}];

const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // you should provide the dimension name (defined in dimensions.js)
  // and pass mapping, dataTypes, and dimensions.
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.
  //'dimensionName' in mapping ? null : (mapping.dimensionName = { value: undefined })

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  }; // we will use rollup to populate a flat array of objects
  // that will be passed to the render

  let results = [];
  rollups(data, v => {
    const item = {
      date: timeDay.floor(v[0][mapping.date.value]),
      // get the first one since it's grouped
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'default' // aggregate, by default single color.

    };
    results.push(item);
    return item;
  }, d => d[mapping.date.value].getFullYear(), // year grouping
  d => timeDay(d[mapping.date.value]));
  return results;
};

selection.prototype.styles = styles$1;
transition.prototype.styles = styles$1; //other approach
// export const multiStyles = function (styles) {
//   return function (selection) {
//     for (const property in styles) {
//       selection.style(property, styles[property])
//     }
//   }
// }
//adapted from https://github.com/gka/d3-jetpack/blob/master/src/st.js

function styles$1(name, value) {
  if (typeof name == 'object') {
    for (var key in name) {
      addStyle(this, key, name[key]);
    }

    return this;
  } else if (typeof name === 'function') {
    return this.each(styleFunction(name));
  } else {
    return arguments.length == 1 ? this.style(name) : addStyle(this, name, value);
  }

  function addStyle(sel, style, value) {
    style = style.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    var pxStyles = 'top left bottom right padding-top padding-left padding-bottom padding-right border-top b-width border-left-width border-botto-width m border-right-width margin-top margin-left margin-bottom margin-right font-size width stroke-width line-height margin padding border border-radius max-width min-width max-height min-height';

    if (~pxStyles.indexOf(style)) {
      sel.style(style, typeof value == 'function' ? wrapPx(value) : addPx(value));
    } else {
      sel.style(style, value);
    }

    return sel;
  }

  function addPx(d) {
    return d.match ? d : d + 'px';
  }

  function wrapPx(fn) {
    return function () {
      var val = fn.apply(this, arguments);
      return addPx(val);
    };
  }

  function styleFunction(value) {
    return function () {
      var v = value.apply(this, arguments);

      for (var key in v) {
        addStyle(select(this), key, v[key]);
      }
    };
  }
}

function render(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    showLegend,
    legendWidth,
    // color dimension option, defined in visualOptions.js
    colorScale,
    firstWeekDay,
    yearsPadding,
    yearsSorting
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const years = groups(data, d => timeYear(d.date)).sort((a, b) => d3[yearsSorting](a[0], b[0]));
  const cols = max(years.map(d => d[0]), d => timeWeek.count(d, new Date(d.getFullYear(), 11, 31)));
  const rows = years.length * 7;
  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom - yearsPadding * (years.length - 1);
  let cellSize;

  if (chartHeight / rows < chartWidth / cols) {
    cellSize = chartHeight / rows;
    chartWidth = cellSize * cols;
  } else {
    cellSize = chartWidth / cols;
    chartHeight = cellSize * rows;
  }

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  const yearScale = scaleBand().domain(years.map(d => d[0])).range([0, chartHeight]).align(1);

  const countDay = i => {
    return firstWeekDay === 'Monday' ? (i + 6) % 7 : firstWeekDay === 'Saturday' ? (i + 8) % 7 : i;
  }; // adapted from https://observablehq.com/@d3/calendar-view


  const year = svg.selectAll('g').data(years).join('g').attr('transform', (d, i) => `translate(0,${yearScale(d[0]) + yearsPadding * i})`).attr('id', d => d[0]);
  year.selectAll('rect').data(d => d[1]).join('rect').attr('width', cellSize - 1).attr('height', cellSize - 1).attr('x', d => d3[`time${firstWeekDay}`].count(timeYear(d.date), d.date) * cellSize + 0.5).attr('y', d => countDay(d.date.getDay()) * cellSize + 0.5).attr('fill', d => colorScale(d.color)).append('title').text(d => d.date);
  year.append('text').attr('text-anchor', 'end').attr('x', -5).attr('y', -3).text(d => d[0].getFullYear()).styles(styles.labelPrimary);
  year.append('g').attr('text-anchor', 'end').selectAll('text').data(d => {
    return timeDay.range(d3[`time${firstWeekDay}`](), timeDay.offset(d3[`time${firstWeekDay}`](), 7));
  }).join('text').attr('x', -5).attr('y', (d, i) => (i + 0.5) * cellSize).attr('dominant-baseline', 'middle').text(d => timeFormat('%a')(d)).styles(styles.labelSecondary);
  const month = year.append('g').selectAll('g').data(d => utcMonths(timeMonth(d[1][0].date), d[1][d[1].length - 1].date)).join('g');
  month.append('path').attr('fill', 'none').attr('stroke', '#ccc').attr('stroke-width', 1).attr('d', pathMonth);
  month.append('text').attr('x', d => d3[`time${firstWeekDay}`].count(utcYear(d), d3[`time${firstWeekDay}`].ceil(d)) * cellSize + 2).attr('y', -3).text(timeFormat('%b')).styles(styles.labelSecondary);

  function pathMonth(t) {
    const n = 7;
    const d = Math.max(0, Math.min(n, countDay(t.getDay())));
    const w = d3[`time${firstWeekDay}`].count(utcYear(t), t);
    return `${d === 0 ? `M${w * cellSize},0` : d === n ? `M${(w + 1) * cellSize},0` : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  firstWeekDay: {
    label: 'First week day',
    type: 'text',
    options: ['Saturday', 'Sunday', 'Monday'],
    default: 'Monday',
    group: 'chart'
  },
  yearsSorting: {
    label: 'Sorting years',
    type: 'text',
    options: ['ascending', 'descending'],
    default: 'ascending',
    group: 'chart'
  },
  yearsPadding: {
    label: 'Padding between years (px)',
    type: 'number',
    step: 1,
    min: 0,
    default: 30,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateReds'
    },
    group: 'color'
  }
};

var styles = {"axisLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"#7b7b7b","fontWeight":"bold"},"axisLine":{"stroke":"#ccc"},"labelPrimary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"bold"},"labelSecondary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal"},"labelItalic":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal","fontStyle":"italic"},"seriesLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"black","fontWeight":"bold","dominantBaseline":"hanging"},"labelOutline":{"strokeWidth":"2px","paintOrder":"stroke","stroke":"white","strokeLinecap":"round","strokeLinejoin":"round"}};

var calendarHeatmap = {
  metadata,
  dimensions,
  mapData,
  render,
  visualOptions,
  styles
};

export { calendarHeatmap };
