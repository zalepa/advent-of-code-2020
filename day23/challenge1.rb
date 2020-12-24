require 'colorize'

input = '158937462'

pieces = input.split('').map { |x| x.to_i }

class Game
  def initialize(pieces)
    @pieces = pieces
    @lowestCup = @pieces.sort.first
    @higestCup = @pieces.sort.last
    @currentMove = 1
    @next_cups = nil
    @currentCup = @pieces.first
  end

  def answer
    split_index = @pieces.index(1)
    @pieces[(split_index + 1)..-1].concat(@pieces[0..(split_index - 1)]).join('')
  end

  def move(debug=false)
    puts "--- Move #{@currentMove} ---" if debug
    puts "cups: #{cup_list}" if debug

    pickup_next_cups

    puts "pick up: #{@next_cups.join(' ')}" if debug
    
    increment_move
    
    select_destination_cup

    puts "destination: #{@destinationCup}" if debug

    @next_cups.each { |e| @pieces.delete_at(@pieces.index(e))}

    first_half = @pieces[0..(@pieces.index(@destinationCup))]
    second_half  = @pieces[(@pieces.index(@destinationCup) + 1)..-1]

    @pieces = first_half.concat(@next_cups).concat(second_half)

    increment_cup_position

  end

  private

  def select_destination_cup
    @destinationCup = @currentCup - 1
    while @next_cups.include?(@destinationCup) or @destinationCup < @lowestCup
      @destinationCup -= 1
      if @destinationCup < @lowestCup
        @destinationCup = @higestCup
      end
    end
  end

  def pickup_next_cups

    index_of_current_cup = @pieces.index(@currentCup)

    if index_of_current_cup >= (@pieces.length - 3)  
      if index_of_current_cup ==  @pieces.length - 1
        @next_cups = [
          @pieces[0],
          @pieces[1],
          @pieces[2],
        ]
      elsif index_of_current_cup == @pieces.length - 2
        @next_cups = [
          @pieces[-1],
          @pieces[0],
          @pieces[1],
        ]
      elsif index_of_current_cup == @pieces.length - 3
        @next_cups = [
          @pieces[-2],
          @pieces[-1],
          @pieces[0],
        ]
      end
    else
      @next_cups = [
        @pieces[index_of_current_cup + 1],
        @pieces[index_of_current_cup + 2],
        @pieces[index_of_current_cup + 3],
      ]
    end
  end
  
  def increment_move
    @currentMove += 1
  end

  def increment_cup_position
    
    index_of_current_position = @pieces.index(@currentCup)
    if (index_of_current_position == @pieces.length - 1)
      @currentCup = @pieces[0]
    else
      @currentCup = @pieces[index_of_current_position + 1]
    end
  end

  def cup_list
    @pieces
      .each_with_index
      .map(&method(:decorate_element))
      .join(' ')
  end

  def decorate_element(el, idx)
    idx == @pieces.index(@currentCup) ? "(#{el})" : el
  end


end

game = Game.new(pieces)

100.times { game.move }

puts game.answer