class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.extras = {
            chantily: 'cafe',
            queijo: 'sanduiche',
        };

        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0;
        let i = 0;
        const itemQuantities = [];
        let itemPrincipal = 0;
        const [cod, par] = [];

        let size = itens.length
        if (size < 1) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (quantidade < 1) {
                return "Quantidade inválida!"
            }
            const valorItem = this.cardapio[codigo];

            if (valorItem === undefined) {
                return "Item inválido!";
            }

            total += valorItem * parseInt(quantidade);

            if (this.extras[codigo]) {
                itemQuantities.push(codigo);
            }

        }


        if (itemQuantities.length > 0) {
            for (const cod of itemQuantities) {
                for (const item2 of itens) {
                    const [codigo2, quantidade2] = item2.split(',');
                    if (codigo2 === this.extras[cod]) {
                        itemPrincipal++;
                    }
                }
            }
            if (itemPrincipal < 1) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }


        if (metodoDePagamento === 'dinheiro') {
            total -= total * this.descontoDinheiro;
        } else if (metodoDePagamento === 'credito') {
            total += total * this.acrescimoCredito;
        } else if (metodoDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}
export { CaixaDaLanchonete };
