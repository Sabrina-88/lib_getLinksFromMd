var chai = require('chai');
var text = require('../index');
var expect = chai.expect;

describe('str', function() {
  describe('#getLinksFromMd', function() {
    describe('Quando o texto for uma string e não houver url', function() {
      it('Deverá retornar um array vazio', function() {
        expect(text.getLinksFromMd('Esse texto nao possui url')).to.be.an('array');
      });
    });

    describe('Quando não houver parâmetro', function() {
      it('Deverá lançar o seguinte erro:', function() {
        var textResult = function() {
          text.getLinksFromMd('');
        };
        expect(textResult).to.throw('Digite somente texto');
      });
    });

    describe('Quando o texto for um numero ', function() {
      it('Deverá lançar o seguinte erro:', function() {
        var textResult = function() {
          text.getLinksFromMd(12345);
        };
        expect(textResult).to.throw('Digite somente texto');
      });
    });

    describe('Quando o texto for uma string ', function() {
      describe('e houver uma url', function() {
        it('Deverá retornar um array com o objeto com a url e o link do markdown.', function() {
          expect(text.getLinksFromMd('Olá testando [google](www.google.com)')).to.deep.equal([ { href: 'www.google.com',
            text: 'google' } ]);
          expect(text.getLinksFromMd('Lorem ipsum [google](www.google.com) dolor sit amet')).to.deep.equal([ { href: 'www.google.com',
            text: 'google' } ]);
          expect(text.getLinksFromMd('[google](www.google.com) Lorem ipsum dolor sit amet')).to.deep.equal([ { href: 'www.google.com',
            text: 'google' } ]);
        });
      });

      describe('Se houver tres urls diferentes', function() {
        it('Deverá retornar o objeto dentro do array.', function() {
          expect(text.getLinksFromMd('Lorem ipsum dolor sit amet, consectetur adipisicing elit [globo](www.globo.com), sed do eiusmod tempor incididunt [gmail] ut labore (www.gmail.com) et [laboratoria](www.laboratoria.la)  dolore magna aliqua.')).to.deep.equal([{href: 'www.globo.com',
            text: 'globo'}, {href: 'www.gmail.com',
            text: 'gmail'}, {href: 'www.laboratoria.la',
            text: 'laboratoria'} ]);
        });
      });	
    });
  });
});