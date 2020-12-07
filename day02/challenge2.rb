passwords = File.readlines(__dir__ + '/input.txt').map do |l|
  parts = l.split(' ')
  scheme = parts[0].split('-')
  index1 = scheme[0].to_i
  index2 = scheme[1].to_i
  letter = parts[1].split(':')[0]
  password = parts[2]
  {index1: index1, index2: index2, letter: letter, password: password}
end

sum = 0

passwords.each do |pass|
  password = pass[:password]
  one = pass[:index1]
  two = pass[:index2]
  ltr = pass[:letter]

  located_at_one = password[one - 1] == ltr
  located_at_two = password[two - 1] == ltr

  if (located_at_one || located_at_two) && !(located_at_one && located_at_two)
    sum +=1 
  end
end

puts sum