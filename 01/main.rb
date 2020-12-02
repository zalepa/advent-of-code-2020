input = File.readlines(__dir__ + '/input').map { |l| l.gsub(/\n/, '').to_i}

input.each do |i|
  input.each do |j|
    sum = i + j
    if sum == 2020
      puts i * j
      exit
    end
  end
end

# 980499