//
//  CardView.swift
//  CitizenshipMemoryGame
//
//  Created by Arnaud Ober on 2025-06-27.
//

import SwiftUI

struct CardView: View {
    let text: String
    let isFaceUp: Bool

    var body: some View {
        ZStack {
            if isFaceUp {
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.white)
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.blue, lineWidth: 2)
                Text(text)
                    .padding()
                    .foregroundColor(.black)
            } else {
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.blue)
            }
        }
        .frame(width: 100, height: 140)
    }
}
