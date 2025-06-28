//
//  model.swift
//  CitizenshipMemoryGame
//
//  Created by Arnaud Ober on 2025-06-27.
//

import SwiftUI

struct QA: Identifiable {
    let id = UUID()
    let question: String
    let answer: String
}

let samplePairs: [QA] = [
    QA(question: "Who is the Head of State?", answer: "The King"),
    QA(question: "Capital of Canada?", answer: "Ottawa"),
    QA(question: "Number of provinces?", answer: "10"),
    QA(question: "One responsibility of citizenship?", answer: "Obey the law")
]

struct Card: Identifiable {
    let id = UUID()
    let text: String
    let pairID: UUID
    var isMatched = false
    var isFaceUp = false
}
