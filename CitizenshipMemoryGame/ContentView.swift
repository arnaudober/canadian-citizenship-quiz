//
//  ContentView.swift
//  CitizenshipMemoryGame
//
//  Created by Arnaud Ober on 2025-06-27.
//
import SwiftUI

struct ContentView: View {
    @State private var cards: [Card] = []
    @State private var selectedIndices: [Int] = []

    var body: some View {
        VStack {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 100))]) {
                ForEach(cards.indices, id: \.self) { i in
                    CardView(text: cards[i].text, isFaceUp: cards[i].isFaceUp || cards[i].isMatched)
                        .onTapGesture {
                            flipCard(at: i)
                        }
                        .opacity(cards[i].isMatched ? 0.3 : 1)
                }
            }
            .padding()

            Button("Restart") {
                setupGame()
            }
            .padding()
        }
        .onAppear {
            setupGame()
        }
    }

    func setupGame() {
        cards = []
        for qa in samplePairs.shuffled() {
            let pairID = UUID()
            cards.append(Card(text: qa.question, pairID: pairID))
            cards.append(Card(text: qa.answer, pairID: pairID))
        }
        cards.shuffle()
        selectedIndices = []
    }

    func flipCard(at index: Int) {
        guard !cards[index].isMatched,
              !cards[index].isFaceUp,
              selectedIndices.count < 2 else { return }

        cards[index].isFaceUp = true
        selectedIndices.append(index)

        if selectedIndices.count == 2 {
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                let first = selectedIndices[0]
                let second = selectedIndices[1]
                if cards[first].pairID == cards[second].pairID {
                    cards[first].isMatched = true
                    cards[second].isMatched = true
                } else {
                    cards[first].isFaceUp = false
                    cards[second].isFaceUp = false
                }
                selectedIndices = []
            }
        }
    }
}
