passwords = File.readlines(__dir__ + '/input.txt').map do |l|
  parts = l.split(' ')
  scheme = parts[0].split('-')
  min = scheme[0].to_i
  max = scheme[1].to_i
  letter = parts[1].split(':')[0]
  password = parts[2]
  {min: min, max: max, letter: letter, password: password}
end

sum = 0

passwords.each do |pass|
  appearances = pass[:password].count(pass[:letter])
  if appearances >= pass[:min] && appearances <= pass[:max]
    sum += 1
  end
end

puts sum
