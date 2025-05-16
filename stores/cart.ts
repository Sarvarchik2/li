// stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as {
            id: number,
            name: string,
            price: number,
            quantity: number,
            image: string,
            category: string
        }[]
    }),
    actions: {
        addToCart(product) {
            const existing = this.items.find(item => item.id === product.id)
            if (existing) {
                existing.quantity += product.quantity
            } else {
                this.items.push({ ...product })
            }
        },
        increment(index: number) {
            this.items[index].quantity++
        },
        decrement(index: number) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--
            }
        },
        remove(index: number) {
            this.items.splice(index, 1)
        },
        clearCart() {
            this.items = []
        }
    },
    getters: {
        totalPrice: state =>
            state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
})
