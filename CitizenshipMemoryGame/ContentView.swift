import SwiftUI

struct QA: Identifiable {
    let id = UUID()
    let question: String
    let answer: String
}

// 💬 Full pool of questions — extend as needed!
let allFlashcards: [QA] = [
    QA(question: "What is the capital of Canada?", answer: "Ottawa"),
    QA(question: "Who is the Head of State?", answer: "The King"),
    QA(question: "Two responsibilities of a Canadian citizen?", answer: "Obey the law and vote in elections"),
    QA(question: "How many provinces are there in Canada?", answer: "10 provinces"),
    QA(question: "What is the name of the national police force?", answer: "Royal Canadian Mounted Police (RCMP)"),
    QA(question: "What are the official languages of Canada?", answer: "English and French"),
    QA(question: "What does the Canadian flag look like?", answer: "Red and white with a maple leaf"),
    QA(question: "What is the Constitution?", answer: "The supreme law of Canada"),
    QA(question: "Who can vote in federal elections?", answer: "Canadian citizens aged 18 or older"),
    QA(question: "What are the three parts of Parliament?", answer: "The Monarch, the Senate, and the House of Commons"),
    QA(question: "What is the name of Canada's national anthem?", answer: "O Canada"),
    QA(question: "When is Canada Day?", answer: "July 1"),
    QA(question: "What do we remember on Remembrance Day?", answer: "The sacrifices of veterans and fallen soldiers"),
    QA(question: "Who is Canada’s current Prime Minister?", answer: "Justin Trudeau"),
    QA(question: "What are three responsibilities of the provinces?", answer: "Education, health care, transportation"),
    QA(question: "What is multiculturalism?", answer: "The recognition and celebration of cultural diversity"),
    QA(question: "What is the Canadian Charter of Rights and Freedoms?", answer: "A part of the Constitution that protects individual rights"),
    QA(question: "Who was the first Prime Minister of Canada?", answer: "Sir John A. Macdonald"),
    QA(question: "What are the Prairie provinces?", answer: "Alberta, Saskatchewan, Manitoba"),
    QA(question: "What is the economic capital of Canada?", answer: "Toronto")
    // You can add even more here...
]

struct ContentView: View {
    @State private var currentSet: [QA] = []
    @State private var index = 0
    @State private var showAnswer = false
    @State private var isCompleted = false

    var body: some View {
        ZStack {
            Color(.systemGroupedBackground)
                .ignoresSafeArea()

            VStack(spacing: 24) {
                // Header
                HStack {
                    Text("🇨🇦 Citizenship Flashcards")
                        .font(.title2).bold()
                    Spacer()
                    Button {
                        withAnimation { startNewSet() }
                    } label: {
                        Image(systemName: "arrow.clockwise")
                            .font(.title3)
                            .foregroundColor(.blue)
                            .padding(10)
                            .background(Color(.secondarySystemBackground), in: Circle())
                            .shadow(radius: 2)
                    }
                }
                .padding(.horizontal)

                // End of set
                if isCompleted {
                    VStack(spacing: 20) {
                        Text("✅ Set Completed!")
                            .font(.title2)
                            .fontWeight(.semibold)

                        Button("Start New Set") {
                            withAnimation {
                                startNewSet()
                            }
                        }
                        .padding()
                        .frame(width: 180)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                        .shadow(radius: 2)
                    }

                } else {
                    // Card
                    ZStack {
                        RoundedRectangle(cornerRadius: 20)
                            .fill(showAnswer ? Color.green.opacity(0.15) : Color.blue.opacity(0.15))
                            .overlay(
                                RoundedRectangle(cornerRadius: 20)
                                    .stroke(showAnswer ? Color.green : Color.blue, lineWidth: 1.5)
                            )
                            .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
                            .frame(width: 340, height: 280)

                        VStack {
                            ScrollView {
                                Text(currentSet[safe: index]?.question ?? "")
                                    .font(.title2)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.primary)
                                    .multilineTextAlignment(.center)
                                    .padding()
                                    .frame(maxWidth: .infinity, alignment: .center)
                                    .opacity(showAnswer ? 0 : 1)

                                Text(currentSet[safe: index]?.answer ?? "")
                                    .font(.title2)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.primary)
                                    .multilineTextAlignment(.center)
                                    .padding()
                                    .frame(maxWidth: .infinity, alignment: .center)
                                    .opacity(showAnswer ? 1 : 0)
                            }
                            .frame(width: 300, height: 220)

                            Text(showAnswer ? "Answer" : "Question")
                                .font(.caption)
                                .foregroundColor(.gray)
                                .padding(.bottom, 8)
                        }
                    }
                    .onTapGesture {
                        if !showAnswer {
                            withAnimation(.easeInOut) {
                                showAnswer = true
                            }
                        }
                    }

                    // Next Button
                    if showAnswer {
                        Button(action: {
                            withAnimation {
                                goToNext()
                            }
                        }) {
                            Text(index + 1 == currentSet.count ? "Finish" : "Next")
                                .font(.headline)
                                .padding()
                                .frame(width: 140)
                                .background(Color.blue)
                                .foregroundColor(.white)
                                .cornerRadius(12)
                        }
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                    }

                    Spacer()

                    Text("Card \(index + 1) of \(currentSet.count)")
                        .foregroundColor(.secondary)
                        .font(.subheadline)
                }
            }
            .padding(.vertical)
            .padding(.bottom, 30)
        }
        .onAppear {
            startNewSet()
        }
    }

    // MARK: - Logic

    func startNewSet() {
        currentSet = allFlashcards.shuffled().prefix(20).map { $0 }
        index = 0
        showAnswer = false
        isCompleted = false
    }

    func goToNext() {
        if index + 1 < currentSet.count {
            index += 1
            showAnswer = false
        } else {
            isCompleted = true
        }
    }
}

// MARK: - Array safe index helper

extension Array {
    subscript(safe index: Int) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}

#Preview {
    ContentView()
}

