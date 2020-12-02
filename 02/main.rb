input = File.readlines(__dir__ + '/input').map { |l| l.gsub(/\n/, '').to_i}

input.each do |i|
  input.each do |j|
    input.each do |k|
      sum = i + j + k
      if sum == 2020
        puts i * j * k
        exit
      end
    end
  end
end